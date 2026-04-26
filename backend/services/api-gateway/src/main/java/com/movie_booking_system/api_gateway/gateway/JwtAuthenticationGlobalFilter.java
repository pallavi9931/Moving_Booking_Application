package com.movie_booking_system.api_gateway.gateway;

import java.nio.charset.StandardCharsets;

import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;

import com.movie_booking_system.api_gateway.domain.TokenBlacklistRepository;
import com.movie_booking_system.api_gateway.jwt.JwtUtil;

import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

@Component
public class JwtAuthenticationGlobalFilter implements GlobalFilter, Ordered {

	private static final String BEARER_PREFIX = "Bearer ";

	private static final String X_USER_HEADER = "X-User";

	private final JwtUtil jwtUtil;

	private final TokenBlacklistRepository tokenBlacklistRepository;

	public JwtAuthenticationGlobalFilter(JwtUtil jwtUtil, TokenBlacklistRepository tokenBlacklistRepository) {
		this.jwtUtil = jwtUtil;
		this.tokenBlacklistRepository = tokenBlacklistRepository;
	}

	@Override
	public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
		if (isPublicAuthPath(exchange)) {
			return chain.filter(exchange);
		}
		if (exchange.getRequest().getMethod() == HttpMethod.OPTIONS) {
			return chain.filter(exchange);
		}

		String authHeader = exchange.getRequest().getHeaders().getFirst(HttpHeaders.AUTHORIZATION);
		if (authHeader == null || !authHeader.startsWith(BEARER_PREFIX)) {
			return writeUnauthorized(exchange);
		}
		String token = authHeader.substring(BEARER_PREFIX.length()).trim();
		if (token.isEmpty()) {
			return writeUnauthorized(exchange);
		}

		return Mono.fromCallable(() -> tokenBlacklistRepository.exists(token))
				.subscribeOn(Schedulers.boundedElastic())
				.flatMap(blacklisted -> {
					if (Boolean.TRUE.equals(blacklisted)) {
						return writeUnauthorized(exchange);
					}
					if (!jwtUtil.validateToken(token)) {
						return writeUnauthorized(exchange);
					}
					String username = jwtUtil.extractUsername(token);
					ServerHttpRequest mutated = exchange.getRequest().mutate().header(X_USER_HEADER, username).build();
					return chain.filter(exchange.mutate().request(mutated).build());
				});
	}

	/**
	 * Login and register must skip JWT. Path is normalized because clients, proxies, or
	 * the URI may include trailing slashes or slight variations.
	 */
	private static boolean isPublicAuthPath(ServerWebExchange exchange) {
		if (matchesPublicAuth(normalizePath(uriPath(exchange)))) {
			return true;
		}
		return matchesPublicAuth(normalizePath(exchange.getRequest().getPath().value()));
	}

	private static String uriPath(ServerWebExchange exchange) {
		String raw = exchange.getRequest().getURI().getRawPath();
		if (raw != null && !raw.isEmpty()) {
			return raw;
		}
		String path = exchange.getRequest().getURI().getPath();
		return path != null ? path : "";
	}

	private static boolean matchesPublicAuth(String path) {
		return "/auth/login".equals(path) || "/auth/register".equals(path);
	}

	private static String normalizePath(String path) {
		if (path == null) {
			return "";
		}
		String p = path.trim();
		while (p.length() > 1 && p.endsWith("/")) {
			p = p.substring(0, p.length() - 1);
		}
		if (!p.isEmpty() && !p.startsWith("/")) {
			p = "/" + p;
		}
		return p;
	}

	private Mono<Void> writeUnauthorized(ServerWebExchange exchange) {
		exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
		exchange.getResponse().getHeaders().setContentType(MediaType.APPLICATION_JSON);
		byte[] bytes = "{\"error\":\"Unauthorized\"}".getBytes(StandardCharsets.UTF_8);
		DataBuffer buffer = exchange.getResponse().bufferFactory().wrap(bytes);
		return exchange.getResponse().writeWith(Mono.just(buffer));
	}

	@Override
	public int getOrder() {
		return -200;
	}
}
