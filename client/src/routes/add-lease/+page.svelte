<script lang="ts">
  import { api } from '$lib/api';

  let tenantId = '';
  let propertyId = '';
  let startDate = '';
  let endDate = '';
  let rentAmount = '';
  let depositAmount = '';

  let showSuccess = false;

  async function handleAddLease() {
    const leaseData = {
      tenantId,
      propertyId,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
      rentAmount: rentAmount ? Number(rentAmount) : undefined,
      depositAmount: depositAmount ? Number(depositAmount) : undefined,
    };

    try {
      await api.post('/leases', leaseData);
      showSuccess = true;
    } catch (err: any) {
      console.error('Failed to connect:', err);
      alert(`Backend Error: ${err.message || 'Server is down.'}`);
    }
  }

  function goBack() {
    window.location.href = '/leases';
  }

  function closeSuccess() {
    showSuccess = false;
    window.location.href = '/leases'; 
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
      <h2>Add New Lease</h2>

      <form on:submit|preventDefault={handleAddLease}>
        <div class="input-row">
          <label for="tenantId">Tenant ID:</label>
          <input id="tenantId" type="text" bind:value={tenantId} required />
        </div>
        <div class="input-row">
          <label for="propertyId">Property ID:</label>
          <input id="propertyId" type="text" bind:value={propertyId} required />
        </div>
        <div class="input-row">
          <label for="startDate">Start Date:</label>
          <input id="startDate" type="date" bind:value={startDate} />
        </div>
        <div class="input-row">
          <label for="endDate">End Date:</label>
          <input id="endDate" type="date" bind:value={endDate} />
        </div>
        <div class="input-row">
          <label for="rentAmount">Rent Amount:</label>
          <input id="rentAmount" type="number" bind:value={rentAmount} />
        </div>
        <div class="input-row">
          <label for="depositAmount">Deposit Amount:</label>
          <input id="depositAmount" type="number" bind:value={depositAmount} />
        </div>

        <div class="form-actions">
          <button type="button" class="oval-btn secondary" on:click={goBack}>Back</button>
          <button type="submit" class="oval-btn primary">Add Lease</button>
        </div>
      </form>
    </div>
  </section>

  {#if showSuccess}
    <div class="overlay">
      <div class="success-bubble">
        <p>Lease Added!</p>
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
    padding-top: 30px;
    color: white;
  }

  .form-container {
    width: 90%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  h2 {
    text-align: center;
    margin-bottom: 30px;
  }

  .input-row {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }
  .input-row label {
    margin-bottom: 5px;
    font-weight: bold;
  }
  .input-row input {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #333;
    background-color: #222;
    color: white;
  }

  .form-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
  }

  .oval-btn {
    padding: 10px 30px;
    border-radius: 50px;
    font-weight: bold;
    cursor: pointer;
    border: 1px solid #333;
    min-width: 120px;
  }
  .primary {
    background: linear-gradient(#1e4d2b, #11311c);
    color: white;
  }
  .secondary {
    background: transparent;
    color: white;
  }
  .oval-btn:hover {
    filter: brightness(1.2);
  }

  /* Overlay and Success Bubble */
  .overlay {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
  }
  .success-bubble {
    background-color: #1a472a;
    color: white;
    padding: 40px;
    border-radius: 15px;
    text-align: center;
    border: 2px solid white;
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.2);
  }
  .success-bubble p {
    font-size: 1.5rem;
    margin-bottom: 20px;
  }
</style>

// http://localhost:5173/add-lease