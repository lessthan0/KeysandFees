<script lang="ts">
  import { api } from '$lib/api';

  let firstName = '';
  let lastName = '';
  let email = '';
  let password = '';
  let showSuccess = false;

  async function handleSignup() {
    // The backend registerUser requires email, password, role, and displayName
    const userData = { 
      email, 
      password,
      role: 'user', // Backend expects 'admin' or 'user'
      displayName: `${firstName} ${lastName}`
    };

    try {
      await api.post('/register', userData);
      showSuccess = true;
    } catch (err: any) {
      alert(`Signup Error: ${err.message || 'Is the server running?'}`);
    }
  }

  function goToLogin() {
    window.location.href = '/login';
  }
</script>

<div class="landing-page">
  <header class="top-section">
    <div class="header-content">
      <h1 class="main-title">Landlord APP</h1>
    </div>
  </header>

  <section class="bottom-section">
    <div class="form-container">
      <h2>Create Your Account</h2>

      <form on:submit|preventDefault={handleSignup}>
        <div class="input-row">
          <label for="fname">First Name:</label>
          <input id="fname" type="text" bind:value={firstName} required />
        </div>
        <div class="input-row">
          <label for="lname">Last Name:</label>
          <input id="lname" type="text" bind:value={lastName} required />
        </div>
        <div class="input-row">
          <label for="email">Email Address:</label>
          <input id="email" type="email" bind:value={email} required />
        </div>
        <div class="input-row">
          <label for="pass">Password:</label>
          <input id="pass" type="password" bind:value={password} required />
        </div>

        <div class="form-actions">
          <button type="submit" class="oval-btn primary">Sign Up</button>
        </div>
      </form>
    </div>
  </section>

  {#if showSuccess}
    <div class="overlay">
      <div class="success-bubble">
        <p>Account Created!</p>
        <button class="logout-btn" on:click={goToLogin}>Go to Login</button>
      </div>
    </div>
  {/if}
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
    position: relative;
  }

  .top-section {
    background-color: #1a472a;
    height: 25vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .header-content {
    width: 90%;
    max-width: 1000px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .main-title {
    font-family: serif;
    font-size: 3.5rem;
    color: white;
    margin: 0;
  }

  .bottom-section {
    background-color: #000;
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-top: 30px;
    color: white;
    overflow-y: auto;
  }

  .form-container {
    width: 100%;
    max-width: 700px;
    padding: 20px;
  }
  h2 {
    font-size: 1.8rem;
    margin-bottom: 30px;
    text-align: center;
  }

  .input-row {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 15px;
  }
  label {
    width: 220px;
    text-align: right;
    font-size: 1.1rem;
  }
  input {
    flex: 1;
    padding: 8px;
    border: 2px solid #1a472a;
    background: white;
    color: black;
    border-radius: 4px;
  }

  .form-actions {
    display: flex;
    justify-content: center;
    margin-top: 40px;
    padding-bottom: 40px;
  }

  .oval-btn {
    padding: 15px 40px;
    border-radius: 50px;
    font-weight: bold;
    cursor: pointer;
    border: 1px solid #333;
    min-width: 180px;
  }

  .primary {
    background: linear-gradient(#1e4d2b, #11311c);
    color: white;
  }

  .logout-btn {
    background-color: #1a472a;
    color: white;
    border: 1px solid white;
    padding: 10px 30px;
    cursor: pointer;
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
  }

  .success-bubble {
    background-color: #1a472a;
    color: white;
    padding: 4rem;
    border-radius: 50%;
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
    border: 3px solid white;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  }
</style>
