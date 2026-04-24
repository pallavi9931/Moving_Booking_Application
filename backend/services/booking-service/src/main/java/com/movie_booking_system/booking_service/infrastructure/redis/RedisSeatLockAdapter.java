package com.movie_booking_system.booking_service.infrastructure.redis;

import java.time.Duration;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import com.movie_booking_system.booking_service.domain.repository.SeatLockPort;

@Component
public class RedisSeatLockAdapter implements SeatLockPort {

	private static final Duration LOCK_TTL = Duration.ofMinutes(5);

	private final RedisTemplate<String, String> redisTemplate;

	public RedisSeatLockAdapter(RedisTemplate<String, String> redisTemplate) {
		this.redisTemplate = redisTemplate;
	}

	@Override
	public boolean lockSeats(Long showId, List<String> seats, String userId) {
		List<String> successfullyLockedKeys = new ArrayList<>();
		try {
			for (String seatId : seats) {
				String key = buildKey(showId, seatId);
				Boolean acquired = redisTemplate.opsForValue().setIfAbsent(key, userId, LOCK_TTL);
				if (Boolean.TRUE.equals(acquired)) {
					successfullyLockedKeys.add(key);
				}
				else {
					releaseKeys(successfullyLockedKeys);
					return false;
				}
			}
			return true;
		}
		catch (RuntimeException ex) {
			releaseKeys(successfullyLockedKeys);
			throw ex;
		}
	}

	@Override
	public void releaseSeats(Long showId, List<String> seats) {
		for (String seatId : seats) {
			redisTemplate.delete(buildKey(showId, seatId));
		}
	}

	private void releaseKeys(List<String> keys) {
		for (String key : keys) {
			redisTemplate.delete(key);
		}
	}

	@Override
	public List<String> findLockedSeatIds(Long showId) {
		String pattern = "lock:" + showId + ":*";
		Set<String> keys = redisTemplate.keys(pattern);
		if (keys == null || keys.isEmpty()) {
			return Collections.emptyList();
		}
		String prefix = "lock:" + showId + ":";
		List<String> seatIds = new ArrayList<>();
		for (String key : keys) {
			if (key != null && key.startsWith(prefix)) {
				seatIds.add(key.substring(prefix.length()));
			}
		}
		return seatIds;
	}

	private static String buildKey(Long showId, String seatId) {
		return "lock:" + showId + ":" + seatId;
	}

}
