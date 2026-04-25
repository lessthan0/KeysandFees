<script lang="ts">
  let email = '';
  let password = '';

  function handleLogin() {
    console.log('Logging in with:', email);
    window.location.href = '/';
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
        <a href="/signup">Signup</a>
        <a href="/login" class="active">Login</a>
      </nav>
    </div>
  </header>

  <section class="bottom-section">
    <div class="login-content">
      <h2>Welcome Back!</h2>

      <form on:submit|preventDefault={handleLogin}>
        <div class="input-group">
          <label for="email">Email:</label>
          <input type="email" id="email" bind:value={email} required />
        </div>

        <div class="input-group">
          <label for="password">Password:</label>
          <input type="password" id="password" bind:value={password} required />
        </div>

        <div class="button-container">
          <button type="submit" class="oval-button">Log In</button>
        </div>
      </form>
    </div>
  </section>
</div>

<style>
  /* Ensure the body doesn't have weird margins */
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

  /* GREEN TOP SECTION - Matches Landing Page Height */
  .top-section {
    background-color: #1a472a;
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

  /* BLACK BOTTOM SECTION - Fills remaining screen */
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
    width: 100px;
    text-align: right;
    font-size: 1.2rem;
  }

  input {
    flex: 1;
    padding: 12px;
    background-color: white;
    border: 2px solid #1a472a;
    color: black;
    font-size: 1.1rem;
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
    border-radius: 50px;
    font-size: 1.1rem;
    font-weight: bold;
    cursor: pointer;
    min-width: 250px;
  }

  .oval-button:hover {
    filter: brightness(1.2);
  }
</style>
