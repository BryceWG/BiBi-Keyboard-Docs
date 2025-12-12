<script setup lang="ts">
import { onMounted, ref } from 'vue'

const repo = 'BryceWG/BiBi-Keyboard'
const repoUrl = `https://github.com/${repo}`

const stars = ref<number | null>(null)

const cacheKey = 'gh-stars-count'
const cacheTsKey = 'gh-stars-ts'
const cacheTtlMs = 1000 * 60 * 60 * 12 // 12 hours

function loadCache(): boolean {
  try {
    const ts = Number(localStorage.getItem(cacheTsKey))
    const val = Number(localStorage.getItem(cacheKey))
    if (ts && Number.isFinite(val) && Date.now() - ts < cacheTtlMs) {
      stars.value = val
      return true
    }
  } catch (_) {
    // Ignore if storage is unavailable.
  }
  return false
}

async function fetchStars() {
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}`, {
      headers: { Accept: 'application/vnd.github+json' }
    })
    if (!res.ok) throw new Error(String(res.status))
    const data = await res.json()
    const count = Number(data?.stargazers_count)
    if (!Number.isFinite(count)) throw new Error('invalid')
    stars.value = count
    try {
      localStorage.setItem(cacheKey, String(count))
      localStorage.setItem(cacheTsKey, String(Date.now()))
    } catch (_) {
      // Ignore write errors.
    }
  } catch (_) {
    // Keep null on failure; UI falls back to "Star".
  }
}

onMounted(() => {
  if (!loadCache()) fetchStars()
})
</script>

<template>
  <a
    class="gh-stars"
    :href="repoUrl"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="GitHub Stars"
  >
    <span class="gh-stars__icon" aria-hidden="true">★</span>
    <span v-if="stars !== null" class="gh-stars__count">
      {{ stars.toLocaleString() }}
    </span>
    <span v-else class="gh-stars__label">Star</span>
  </a>
</template>
