<script lang="ts">
  import { onMount } from 'svelte';
  import { api } from '$lib/api';

  let tenants: any[] = [];
  let loading = true;

  onMount(async () => {
    try {
      tenants = await api.get('/tenants');
    } catch (err: any) {
      console.error('Failed to fetch tenants:', err);
      // Optional: Handle redirect if unauthorized
    } finally {
      loading = false;
    }
  });

  async function handleLogout() {
    window.location.href = '/login';
  }

  function goBack() {
    window.location.href = '/profile';
  }

  function goToAddTenant() {
    window.location.href = '/add-tenant';
  }

  function goToEditTenant(id: string) {
    window.location.href = `/edit-tenant/${id}`;
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
    <div class="list-container">
      <button class="back-link" on:click={goBack}>Back</button>

      <h2 class="section-title">Current Tenants</h2>

      <div style="margin-bottom: 20px; text-align: center;">
        <button class="oval-btn primary" on:click={goToAddTenant}>+ Add New Tenant</button>
      </div>

      {#if loading}
        <p>Loading tenants...</p>
      {:else if tenants && tenants.length > 0}
        <div class="property-list">
          {#each tenants as tenant, i}
            <div class="property-row">
              <div class="property-info">
                <span class="label">Tenant {i + 1}:</span>
                <span class="address">{tenant.firstName} {tenant.lastName}</span>
              </div>
              <div class="action-buttons">
                <button class="action-btn" on:click={() => goToEditTenant(tenant.tenantId)}>Edit Tenant</button>
              </div>
            </div>
          {/each}
        </div>
      {:else}
        <p>You have not added any tenants yet.</p>
      {/if}
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
  .list-container {
    width: 90%;
    max-width: 900px;
    position: relative;
  }
  .back-link {
    position: absolute;
    top: 0;
    left: 0;
    background: none;
    border: none;
    color: white;
    text-decoration: underline;
    font-size: 1.1rem;
    cursor: pointer;
  }
  .section-title {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 40px;
  }
  .property-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .property-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #333;
    padding-bottom: 10px;
  }
  .property-info {
    font-size: 1.2rem;
  }
  .label {
    font-weight: bold;
    margin-right: 10px;
  }
  .action-buttons {
    display: flex;
    gap: 10px;
  }
  .action-btn {
    background: none;
    border: 1px solid #555;
    color: white;
    padding: 5px 15px;
    cursor: pointer;
  }
  .action-btn:hover {
    background-color: #333;
  }

  .oval-btn {
    padding: 10px 30px;
    border-radius: 50px;
    font-weight: bold;
    cursor: pointer;
    border: 1px solid #333;
    min-width: 150px;
  }
  .primary {
    background: linear-gradient(#1e4d2b, #11311c);
    color: white;
  }
  .oval-btn:hover {
    filter: brightness(1.2);
  }
</style>
