<script lang="ts">
  function handleLogout() {
    window.location.href = '/';
  }

  function goBack() {
    window.location.href = '/profile';
  }

  // UPDATE THESE TWO FUNCTIONS:
  function changeUsername() {
    window.location.href = '/edit-profile/username';
  }

  function changePassword() {
    window.location.href = '/edit-profile/password';
  }
</script>

<div class="landing-page">
  <header class="top-section">
    <div class="header-content">
      <h1 class="main-title">Landlord APP</h1>
      <div class="logout-container">
        <button on:click={handleLogout} class="logout-btn">Logout</button>
      </div>
    </div>
  </header>

  <section class="bottom-section">
    <div class="edit-container">
      <button class="back-link" on:click={goBack}>Back</button>

      <h2 class="section-title">Edit Profile</h2>

      <div class="options-grid">
        <button class="oval-choice-btn" on:click={changeUsername}>
          Click to change<br />Username
        </button>

        <button class="oval-choice-btn" on:click={changePassword}>
          Click to Change<br />Password
        </button>
      </div>
    </div>
  </section>
</div>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    background-color: #000;
    overflow: hidden;
  }
  .landing-page {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
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
    padding: 10px 30px;
    cursor: pointer;
  }

  .bottom-section {
    background-color: #000;
    flex-grow: 1;
    display: flex;
    justify-content: center;
    color: white;
    padding-top: 20px;
  }

  .edit-container {
    width: 90%;
    max-width: 1000px;
    position: relative;
    text-align: center;
  }

  .back-link {
    background: none;
    border: none;
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
    position: absolute;
    left: 0;
    top: 0;
  }

  .section-title {
    font-size: 1.2rem;
    margin-bottom: 80px;
    font-weight: normal;
  }

  .options-grid {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 150px; /* Space between the two ovals */
    margin-top: 40px;
  }

  .oval-choice-btn {
    background-color: #1a472a;
    color: white;
    border: 1px solid #333;
    width: 280px;
    height: 180px;
    border-radius: 50%; /* Creates the oval shape */
    font-size: 1.1rem;
    line-height: 1.4;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
    transition:
      transform 0.2s,
      background-color 0.2s;
  }

  .oval-choice-btn:hover {
    transform: scale(1.05);
    background-color: #245e38;
  }
</style>
