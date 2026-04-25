<div class="landing-page">
  <header class="top-section">
    <div class="header-content">
      <h1 class="main-title">Landlord APP</h1>
      <nav class="inner-nav">
        <a href="/">Home</a>
        <a href="/signup">Signup</a>
        <a href="/login">Login</a>
      </nav>
    </div>
  </header>

  <section class="bottom-section">
    <div class="hero-text">
      <h2>Manage Your Properties the Correct Way!</h2>
      <p>Organize Viewings, Handle Rent, and Track Maintenance – Simple and secure!</p>
    </div>

    <div class="button-group">
      <a href="/signup" class="btn oval fill">Create an Account</a>
      <a href="/login" class="btn oval outline">Login In Now</a>
    </div>
  </section>
</div>

<style>
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
    color: white;
    text-decoration: none;
    font-size: 0.9rem;
  }
  .bottom-section {
    background-color: #000;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: white;
  }
  .hero-text h2 {
    font-size: 2.2rem;
    margin-bottom: 15px;
  }
  .hero-text p {
    color: #ccc;
    font-size: 1.1rem;
    margin-bottom: 50px;
  }
  .button-group {
    display: flex;
    gap: 30px;
  }
  .btn {
    padding: 15px 40px;
    border-radius: 50px;
    text-decoration: none;
    font-weight: bold;
    transition: 0.3s;
  }
  .fill {
    background-color: #1e4d2b;
    color: white;
    border: 1px solid #333;
  }
  .outline {
    background-color: transparent;
    color: #ccc;
    border: 1px solid #1e4d2b;
  }
</style>
