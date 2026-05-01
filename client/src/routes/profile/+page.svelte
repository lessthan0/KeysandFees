<script lang="ts">
  import { onMount } from 'svelte';
  import { api } from '$lib/api';

  // We'll eventually pull the real name from your database/session
  let userName = 'Loading...';

  onMount(async () => {
    try {
      const profile: any = await api.get('/profile');
      userName = profile.displayName || 'John Doe';
    } catch (err) {
      console.error('Failed to load profile:', err);
      userName = 'Guest';
    }
  });

  async function handleLogout() {
    try {
      // The backend uses session clearing in logIn/deleteProfile, but a dedicated logout endpoint might be better.
      // If none exists, we'll just clear the frontend state and redirect.
      // For now, redirect to login
      window.location.href = '/login';
    } catch (err) {
      window.location.href = '/login';
    }
  }
</script>

<div class="landing-page">
  <header class="top-section">
    <div class="header-content">
      <div class="logo-area">
        <h1 class="main-title">Landlord APP</h1>
      </div>

      <div class="logout-container">
        <button on:click={handleLogout} class="logout-btn">Logout</button>
      </div>
    </div>
  </header>

  <section class="bottom-section">
    <div class="profile-content">
      <p class="welcome-text">
        Welcome {userName} to your Official Profile, here you can view your properties, edit your profile,
        and if you choose, Delete your account.
      </p>

      <div class="menu-options">
        <h2>User Profile</h2>

        <nav class="profile-links">
          <a href="/properties">View Properties</a>
          <a href="/tenants">View Tenants</a>
          <a href="/edit-profile">Edit Profile</a>
          <a href="/delete-account" class="danger">Delete Account</a>
        </nav>
      </div>
    </div>
  </section>
</div>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    background-color: #000;
  }

  .landing-page {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
  }

  .top-section {
    background-color: #1a472a;
    height: 35vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .header-content {
    width: 90%;
    max-width: 1000px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .main-title {
    font-family: serif;
    font-size: 3.5rem;
    color: white;
    margin: 0;
  }

  .logout-btn {
    background-color: #1a472a;
    color: white;
    border: 1px solid white;
    padding: 15px 40px;
    font-size: 1.1rem;
    cursor: pointer;
    transition: background 0.3s;
  }

  .logout-btn:hover {
    background-color: #245e38;
  }

  .bottom-section {
    background-color: #000;
    flex-grow: 1;
    display: flex;
    justify-content: center;
    padding-top: 50px;
    color: white;
    text-align: center;
  }

  .profile-content {
    max-width: 700px;
    width: 90%;
  }

  .welcome-text {
    font-size: 1.2rem;
    line-height: 1.6;
    margin-bottom: 60px;
    color: #efefef;
  }

  h2 {
    font-size: 2.2rem;
    margin-bottom: 30px;
    text-decoration: underline;
    text-underline-offset: 10px;
  }

  .profile-links {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .profile-links a {
    color: white;
    text-decoration: none;
    font-size: 1.5rem;
    transition: color 0.2s;
  }

  .profile-links a:hover {
    color: #1a472a;
  }

  /* Just in case you want the delete link to look a bit more serious later */
  .danger:hover {
    color: #ff4d4d !important;
  }
</style>
