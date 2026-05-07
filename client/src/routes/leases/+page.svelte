<script lang="ts">
  async function uploadLeasePdf(leaseId: string, form: HTMLFormElement) {
    const formData = new FormData(form);
    const res = await fetch(`/api/leases/${leaseId}/pdf`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });
    if (res.ok) {
      alert('Lease PDF uploaded successfully!');
      leases = await api.get('/leases');
    } else {
      alert('Failed to upload lease PDF.');
    }
  }
  import { api } from '$lib/api';
  import { onMount } from 'svelte';

  let leases: any[] = [];
  let loading = true;

  onMount(async () => {
    try {
      // Fetch all properties for the user
      const properties = await api.get<any[]>('/properties');
      // Fetch leases for each property and flatten the results
      const allLeases: any[] = [];
      for (const property of properties) {
        try {
          const propertyLeases = await api.get<any[]>(`/properties/${property.propertyId}/leases`);
          for (const lease of propertyLeases) {
            // Attach propertyId for display if not present
            lease.propertyId = property.propertyId;
            allLeases.push(lease);
          }
        } catch (err) {
          // If a property has no leases or error, skip
        }
      }
      leases = allLeases;
    } catch (err: any) {
      console.error('Failed to fetch leases:', err);
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

  function goToAddLease() {
    window.location.href = '/add-lease';
  }

  function goToEditLease(id: string) {
    window.location.href = `/edit-lease/${id}`;
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

      <h2 class="section-title">Current Leases</h2>

      <div style="margin-bottom: 20px; text-align: center;">
        <button class="oval-btn primary" on:click={goToAddLease}>+ Add New Lease</button>
      </div>

      {#if loading}
        <p>Loading leases...</p>
      {:else if leases && leases.length > 0}
        <div class="property-list">
          {#each leases as lease, i}
            <div class="property-row">
              <div class="property-info">
                <span class="label">Lease {i + 1}:</span>
                <!-- Update to fields that make sense for a lease -->
                <span class="address"
                  >Tenant ID: {lease.tenantId} | Property ID: {lease.propertyId}</span
                >
              </div>
              <div class="action-buttons">
                <button class="action-btn" on:click={() => goToEditLease(lease.leaseId)}
                  >Edit Lease</button
                >
              </div>
            </div>
            <!-- Lease PDF Upload Form -->
            <form
              style="margin: 10px 0 30px 0;"
              on:submit|preventDefault={async (e) => {
                await uploadLeasePdf(lease.leaseId, e.target as HTMLFormElement);
              }}
            >
              <input type="file" name="leasePdf" accept="application/pdf" required />
              <button type="submit">Upload Lease PDF</button>
            </form>
          {/each}
        </div>
      {:else}
        <p>You have not added any leases yet.</p>
      {/if}
    </div>
  </section>
</div>

// http://localhost:5173/leases

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
