<template>
  <section
    class="home"
    id="home"
  >
    <div class="home__inner inner">
      <div class="home__blob home__blob--first"></div>
      <div class="home__blob home__blob--second"></div>
      <div class="home__blob home__blob--third"></div>

      <h1 class="home__title title">Tasks mannager</h1>

      <router-link
        class="home__link inline-link"
        to="/tasks"
        >Go to the list of tasks</router-link
      >
    </div>
  </section>
</template>

<style scoped lang="scss">
.home {
  overflow: hidden;
  &__inner {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 4rem;
    min-height: 100vh;
  }

  &__title {
    color: var(--color-accent);
  }

  &__link {
    margin-top: 2rem;
  }
}

.home__blob {
  position: absolute;
  background-color: var(--color-accent);
  border-radius: 30% 50% 20% 40%;
  opacity: 0.15;
  z-index: -1;

  &--first {
    height: 20rem;
    width: 20rem;
    left: 70%;
    top: 80%;
    animation: transform 20s ease-in-out infinite both alternate,
      movement_one 40s ease-in-out infinite both;
  }
  &--second {
    top: -5rem;
    transform: rotate(-180deg);
    animation: transform 30s ease-in-out infinite both alternate,
      movement_two 60s ease-in-out infinite both;
    @media (min-width: 1000px) {
      height: 50rem;
      width: 50rem;
      left: -15rem;
    }
    @media (max-width: 999px) and (min-width: 576px) {
      width: 40rem;
      height: 40rem;
      left: -5rem;
    }
    @media (max-width: 575px) {
      width: 35rem;
      height: 35rem;
      left: -10rem;
    }
  }
  &--third {
    @media (min-width: 769px) {
      height: 45rem;
      width: 45rem;
      left: 50rem;
      top: -15rem;
      transform: rotate(-180deg);
      animation: transform 30s ease-in-out infinite both alternate,
        movement_two 60s ease-in-out infinite both;
    }
    @media (max-width: 768px) {
      display: none;
    }
  }
}

@keyframes transform {
  0%,
  100% {
    border-radius: 33% 67% 70% 30% / 30% 30% 70% 70%;
  }
  20% {
    border-radius: 37% 63% 51% 49% / 37% 65% 35% 63%;
  }
  40% {
    border-radius: 36% 64% 64% 36% / 64% 48% 52% 36%;
  }
  60% {
    border-radius: 37% 63% 51% 49% / 30% 30% 70% 70%;
  }
  80% {
    border-radius: 40% 60% 42% 58% / 41% 51% 49% 59%;
  }
}

@keyframes movement_one {
  0%,
  100% {
    transform: none;
  }
  50% {
    transform: translate(-50%, 20%) rotateY(10deg) scale(1.2);
  }
}

@keyframes movement_two {
  0%,
  500% {
    transform: none;
  }
  50% {
    transform: translate(30%, 10%) rotate(-200deg) scale(1.2);
  }
}
</style>
