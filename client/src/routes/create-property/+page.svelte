<script lang="ts">
  import { api } from '$lib/api';

  // 1. All variables at the top
  let street = '';
  let city = '';
  let state = '';
  let zip = '';
  let rooms = '';
  let baths = '';
  let yearbuilt = '';
  let rent = '';

  let showSuccess = false; // The toggle for your green bubble

  // 2. Combined functions
  async function handleCreateProperty() {
    const propertyData = {
      address: `${street}, ${city}, ${state} ${zip}`,
      bedrooms: parseInt(rooms),
      rentAmount: parseInt(rent), // Backend strictly expects an integer
      yearbuilt: parseInt(yearbuilt)
    };

    try {
      await api.post('/properties', propertyData);
      showSuccess = true;
    } catch (err: any) {
      console.error('Failed to connect:', err);
      alert(`Backend Error: ${err.message || 'Server is down.'}`);
    }
  }

  function goBack() {
    window.location.href = '/profile';
  }

  function closeSuccess() {
    showSuccess = false;
    window.location.href = '/profile'; // Redirect after they acknowledge the success
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
          <label for="street">Street Address:</label>
          <input id="street" type="text" bind:value={street} required />
        </div>
        <div class="input-row">
          <label for="city">City:</label>
          <input id="city" type="text" bind:value={city} required />
        </div>
        <div class="input-row">
          <label for="state">State:</label>
          <input id="state" type="text" bind:value={state} required />
        </div>
        <div class="input-row">
          <label for="zip">Zip Code:</label>
          <input id="zip" type="text" bind:value={zip} required />
        </div>
        <div class="input-row">
          <label for="rooms">Number of Rooms:</label>
          <input id="rooms" type="number" bind:value={rooms} required />
        </div>
        <div class="input-row">
          <label for="baths">Number of Bathrooms:</label>
          <input id="baths" type="number" bind:value={baths} required />
        </div>
        <div class="input-row">
          <label for="yearbuilt">Year Built:</label>
          <input id="yearbuilt" type="number" bind:value={yearbuilt} required />
        </div>
        <div class="input-row">
          <label for="rent">Amount of Rent in $:</label>
          <input id="rent" type="number" bind:value={rent} required />
        </div>

        <div class="form-actions">
          <button type="button" class="oval-btn secondary" on:click={goBack}>Back</button>
          <button type="submit" class="oval-btn primary">Create Property</button>
        </div>
      </form>
    </div>
  </section>

  <!-- The Success Pop-up sitting inside your main layout -->
  {#if showSuccess}
    <div class="overlay">
      <div class="success-bubble">
        <p>Property Created!</p>
        <button class="logout-btn" on:click={closeSuccess}>Close</button>
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
    position: relative; /* Important for the overlay */
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

  /* Overlay Styles */
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
