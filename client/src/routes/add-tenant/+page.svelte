<script lang="ts">
  import { api } from '$lib/api';

  // 1. All variables at the top
  let firstName = '';
  let lastName = '';
  let email = '';
  let phone = '';
  let maritalStatus = '';
  let notes = '';

  let showSuccess = false; // The toggle for your green bubble

  // 2. Combined functions
  async function handleAddTenant() {
    const tenantData = {
      firstName,
      lastName,
      email: email || undefined,
      phone: phone || undefined,
      maritalStatus: maritalStatus || undefined,
      notes: notes || undefined,
    };

    try {
      await api.post('/tenants', tenantData);
      showSuccess = true;
    } catch (err: any) {
      console.error('Failed to connect:', err);
      alert(`Backend Error: ${err.message || 'Server is down.'}`);
    }
  }

  function goBack() {
    window.location.href = '/properties'; // Or wherever you want them to go
  }

  function closeSuccess() {
    showSuccess = false;
    window.location.href = '/properties'; 
  }
</script>

<div class="landing-page">
  <header class="top-section">
    <div class="header-content">
      <h1 class="main-title">Landlord APP</h1>
      <div class="logout-container">
        <button class="logout-btn" on:click={() => window.location.href = '/login'}>Logout</button>
      </div>
    </div>
  </header>

  <section class="bottom-section">
    <div class="form-container">
      <h2>Add New Tenant</h2>

      <form on:submit|preventDefault={handleAddTenant}>
        <div class="input-row">
          <label for="firstName">First Name:</label>
          <input id="firstName" type="text" bind:value={firstName} required />
        </div>
        <div class="input-row">
          <label for="lastName">Last Name:</label>
          <input id="lastName" type="text" bind:value={lastName} required />
        </div>
        <div class="input-row">
          <label for="email">Email Address:</label>
          <input id="email" type="email" bind:value={email} />
        </div>
        <div class="input-row">
          <label for="phone">Phone Number:</label>
          <input id="phone" type="text" bind:value={phone} />
        </div>
        <div class="input-row">
          <label for="maritalStatus">Marital Status:</label>
          <input id="maritalStatus" type="text" bind:value={maritalStatus} />
        </div>
        <div class="input-row">
          <label for="notes">Notes:</label>
          <input id="notes" type="text" bind:value={notes} />
        </div>

        <div class="form-actions">
          <button type="button" class="oval-btn secondary" on:click={goBack}>Back</button>
          <button type="submit" class="oval-btn primary">Add Tenant</button>
        </div>
      </form>
    </div>
  </section>

  <!-- The Success Pop-up sitting inside your main layout -->
  {#if showSuccess}
    <div class="overlay">
      <div class="success-bubble">
        <p>Tenant Added!</p>
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
