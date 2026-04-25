<script lang="ts">
  // Form variables to hold property data
  let street = '';
  let city = '';
  let state = '';
  let zip = '';
  let rooms = '';
  let baths = '';
  let pets = '';
  let rent = '';

  function handleCreateProperty() {
    console.log('Saving Property:', { street, city, state, zip, rooms, baths, pets, rent });
    // This is where we will eventually send a POST request to your backend
    window.location.href = '/profile';
  }

  function goBack() {
    window.location.href = '/profile';
  }
</script>

<div class="landing-page">
  <header class="top-section">
    <div class="header-content">
      <h1 class="main-title">Landlord APP</h1>
      <div class="logout-container">
        <button class="logout-btn">Logout</button>
      </div>
    </div>
  </header>

  <section class="bottom-section">
    <div class="form-container">
      <h2>Create New Property</h2>

      <form on:submit|preventDefault={handleCreateProperty}>
        <div class="input-row">
          <label>Street Address:</label>
          <input type="text" bind:value={street} required />
        </div>
        <div class="input-row">
          <label>City:</label>
          <input type="text" bind:value={city} required />
        </div>
        <div class="input-row">
          <label>State:</label>
          <input type="text" bind:value={state} required />
        </div>
        <div class="input-row">
          <label>Zip Code:</label>
          <input type="text" bind:value={zip} required />
        </div>
        <div class="input-row">
          <label>Number of Rooms:</label>
          <input type="number" bind:value={rooms} required />
        </div>
        <div class="input-row">
          <label>Number of Bathrooms:</label>
          <input type="number" bind:value={baths} required />
        </div>
        <div class="input-row">
          <label>Pet Friendly (Yes/No):</label>
          <input type="text" bind:value={pets} required />
        </div>
        <div class="input-row">
          <label>Amount of Rent in $:</label>
          <input type="number" bind:value={rent} required />
        </div>

        <div class="form-actions">
          <button type="button" class="oval-btn secondary" on:click={goBack}>Back</button>
          <button type="submit" class="oval-btn primary">Create Property</button>
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
  }
  .landing-page {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
  }

  .top-section {
    background-color: #1a472a;
    height: 25vh; /* Made slightly shorter to fit the long form below */
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
    align-items: flex-start;
    padding-top: 30px;
    color: white;
    overflow-y: auto; /* Allows scrolling if the form is tall */
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
    justify-content: space-between;
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
  .secondary {
    background: linear-gradient(#2d5a3c, #1a472a);
    color: white;
  }
  .oval-btn:hover {
    filter: brightness(1.2);
  }
</style>
