package com.movie_booking_system.api_gateway.jwt;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

	/** Logical secret; SHA-256 is applied so the HMAC key meets JJWT's 256-bit minimum for HS256. */
	private static final String SECRET_PHRASE = "my-secret-key";

	private static final int EXPIRY_HOURS = 1;

	private final SecretKey signingKey;

	public JwtUtil() {
		this.signingKey = buildSigningKey();
	}

	private static SecretKey buildSigningKey() {
		try {
			MessageDigest digest = MessageDigest.getInstance("SHA-256");
			byte[] keyBytes = digest.digest(SECRET_PHRASE.getBytes(StandardCharsets.UTF_8));
			return Keys.hmacShaKeyFor(keyBytes);
		}
		catch (NoSuchAlgorithmException e) {
			throw new IllegalStateException("SHA-256 not available", e);
		}
	}

	public String generateToken(String username) {
		Instant now = Instant.now();
		Instant exp = now.plus(EXPIRY_HOURS, ChronoUnit.HOURS);
		return Jwts.builder()
				.subject(username)
				.issuedAt(Date.from(now))
				.expiration(Date.from(exp))
				.signWith(signingKey)
				.compact();
	}

	public boolean validateToken(String token) {
		if (token == null || token.isBlank()) {
			return false;
		}
		try {
			Jwts.parser().verifyWith(signingKey).build().parseSignedClaims(token);
			return true;
		}
		catch (JwtException | IllegalArgumentException e) {
			return false;
		}
	}

	public String extractUsername(String token) {
		return parseClaims(token).getSubject();
	}

	public Instant extractExpiry(String token) {
		Date expiration = parseClaims(token).getExpiration();
		if (expiration == null) {
			throw new JwtException("Token has no expiration");
		}
		return expiration.toInstant();
	}

	private Claims parseClaims(String token) {
		return Jwts.parser().verifyWith(signingKey).build().parseSignedClaims(token).getPayload();
	}
}
