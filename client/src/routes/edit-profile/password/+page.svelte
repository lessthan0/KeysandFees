<script lang="ts">
  let currentPassword = '';
  let newPassword = '';
  let isSaving = false;

  function handleLogout() {
    window.location.href = '/';
  }

  function goBack() {
    window.location.href = '/edit-profile';
  }

  async function savePassword() {
    if (!currentPassword || !newPassword) {
      alert('Please fill out both fields.');
      return;
    }

    isSaving = true;
    console.log('Updating password...');

    // MOCK DELAY: Simulate backend update
    setTimeout(() => {
      isSaving = false;
      alert('Password updated successfully!');
      window.location.href = '/profile';
    }, 1000);
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
    <div class="form-container">
      <button class="back-link" on:click={goBack}>Back</button>

      <h2 class="section-title">Edit Profile</h2>

      <form on:submit|preventDefault={savePassword} class="password-form">
        <div class="input-group">
          <label for="current">Please Enter Current Password:</label>
          <input type="password" id="current" bind:value={currentPassword} />
        </div>

        <div class="input-group">
          <label for="new">Please Enter New Password:</label>
          <input type="password" id="new" bind:value={newPassword} />
        </div>

        <div class="save-container">
          <button type="submit" class="oval-save-btn" disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Click to save changes'}
          </button>
        </div>
      </form>
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

  .form-container {
    width: 90%;
    max-width: 800px;
    position: relative;
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
    text-align: center;
    font-size: 1.2rem;
    margin-bottom: 60px;
    font-weight: normal;
  }

  .password-form {
    display: flex;
    flex-direction: column;
    gap: 30px;
    align-items: center;
  }

  .input-group {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 20px;
    width: 100%;
  }

  label {
    font-size: 1.1rem;
    text-align: right;
    width: 300px;
  }

  input {
    width: 350px;
    height: 45px;
    background: white;
    border: 2px solid #1a472a;
    color: black;
    font-size: 1.1rem;
    padding: 0 10px;
  }

  .save-container {
    margin-top: 60px;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .oval-save-btn {
    background-color: #1a472a;
    color: white;
    border: 1px solid #333;
    padding: 25px 60px;
    border-radius: 100px;
    font-size: 1rem;
    cursor: pointer;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
    transition: transform 0.2s;
  }

  .oval-save-btn:hover {
    transform: scale(1.05);
    filter: brightness(1.2);
  }
</style>
