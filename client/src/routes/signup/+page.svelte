<script lang="ts">
  import { goto } from '$app/navigation'; // SvelteKit navigation function

  // Setup form state variables
  let fullName = '';
  let email = '';
  let password = '';
  let errorMessage = '';

  // Function to handle form submission
  async function handleSignup() {
    console.log('Form data:', { fullName, email, password });

    // Placeholder for backend validation/API call.
    if (!fullName || !email || !password) {
      errorMessage = 'All fields are required.';
      return;
    }

    // On success, redirect to the login page (or dashboard)
    // In a real app, this happens after the API confirms creation.
    console.log('Success! Redirecting to login...');
    goto('/login');
  }
</script>

<div class="landing-page">
  <header class="top-section">
    <div class="header-content">
      <div class="logo-area">
        <h1 class="main-title">Landlord APP</h1>
      </div>

      <nav class="inner-nav">
        <a href="/">Home</a>
        <a href="/signup" class="active">Signup</a>
        <a href="/login">Login</a>
      </nav>
    </div>
  </header>

  <section class="bottom-section">
    <div class="login-content">
      <h2>Create An Account</h2>

      <form on:submit|preventDefault={handleSignup}>
        <div class="input-group">
          <label for="fullName">Full Name:</label>
          <input type="text" id="fullName" bind:value={fullName} required placeholder="John Doe" />
        </div>

        <div class="input-group">
          <label for="email">Email:</label>
          <input
            type="email"
            id="email"
            bind:value={email}
            required
            placeholder="landlord@example.com"
          />
        </div>

        <div class="input-group">
          <label for="password">Password:</label>
          <input
            type="password"
            id="password"
            bind:value={password}
            required
            placeholder="••••••••"
          />
        </div>

        {#if errorMessage}
          <p class="error-msg">{errorMessage}</p>
        {/if}

        <div class="button-container">
          <button type="submit" class="oval-button">Sign Up</button>
        </div>
      </form>
    </div>
  </section>
</div>

<style>
  /* Ensure full-screen behavior from Layout */
  :global(body) {
    margin: 0;
    padding: 0;
    background-color: #000;
    overflow-x: hidden;
  }

  .landing-page {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
  }

  /* GREEN TOP SECTION - Matches others exactly */
  .top-section {
    background-color: #1a472a; /* Dark Forest Green */
    color: white;
    height: 35vh;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #333;
  }

  .header-content {
    width: 90%;
    max-width: 1000px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo-area {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .main-title {
    font-family: serif;
    font-size: 3rem;
    margin: 0;
  }

  .inner-nav {
    border: 1px solid rgba(255, 255, 255, 0.3);
    padding: 10px 20px;
    display: flex;
    gap: 20px;
    background: rgba(0, 0, 0, 0.2);
  }

  .inner-nav a {
    color: #ccc;
    text-decoration: none;
    font-size: 0.9rem;
  }

  .inner-nav a.active {
    color: white;
    font-weight: bold;
  }

  /* BLACK BOTTOM SECTION - Reusing Login styles */
  .bottom-section {
    background-color: #000;
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
  }

  .login-content {
    width: 100%;
    max-width: 600px;
    padding: 20px;
  }

  h2 {
    font-size: 2.2rem;
    margin-bottom: 40px;
    text-align: left;
  }

  /* Form Layout */
  form {
    display: flex;
    flex-direction: column;
    gap: 25px;
  }

  .input-group {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  label {
    width: 120px; /* Slight extra width for 'Full Name' label alignment */
    text-align: right;
    font-size: 1.2rem;
    color: #cbd5e0; /* Match dim gray from ref */
  }

  input {
    flex: 1;
    padding: 12px;
    background-color: white;
    border: 2px solid #1a472a;
    color: black;
    font-size: 1.1rem;
    border-radius: 4px; /* Slight rounding for input boxes */
  }

  /* Optional simple error styling */
  .error-msg {
    color: #ff6b6b;
    font-size: 0.9rem;
    text-align: center;
    margin: 0;
  }

  /* Oval Button */
  .button-container {
    margin-top: 30px;
    display: flex;
    justify-content: center;
  }

  .oval-button {
    background: linear-gradient(to bottom, #1e4d2b, #11311c);
    color: white;
    border: 1px solid #333;
    padding: 15px 80px;
    border-radius: 50px; /* Oval shape */
    font-size: 1.1rem;
    font-weight: bold;
    cursor: pointer;
    min-width: 250px;
    transition:
      filter 0.2s,
      transform 0.1s;
  }

  .oval-button:hover {
    filter: brightness(1.2); /* Highlight effect from ref */
  }

  .oval-button:active {
    transform: scale(0.98); /* Click effect */
  }
</style>
