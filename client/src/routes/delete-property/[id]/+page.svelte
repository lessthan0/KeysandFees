<script lang="ts">
  import { page } from '$app/stores';
  import { api } from '$lib/api';

  async function handlePermanentDelete() {
    const propertyId = $page.params.id;
    try {
      await api.del('/properties/' + propertyId);
      window.location.href = '/properties';
    } catch (err: any) {
      alert(`Delete Error: ${err.message}`);
    }
  }

  function cancelDelete() {
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
    <div class="warning-container">
      <h2>Delete Property</h2>

      <div class="warning-oval">
        <p class="warning-text">
          Are you sure you want to delete this property? Doing so will permanently remove it and all associated tenants.
        </p>

        <div class="choice-buttons">
          <button class="choice-btn" on:click={handlePermanentDelete}>Yes</button>
          <button class="choice-btn" on:click={cancelDelete}>No</button>
        </div>
      </div>
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
    height: 30vh;
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
    align-items: center;
    color: white;
  }

  .warning-container {
    width: 90%;
    max-width: 800px;
    text-align: center;
  }
  h2 {
    font-size: 1.8rem;
    margin-bottom: 20px;
    font-weight: normal;
  }

  .warning-oval {
    background-color: #1a472a; /* Forest Green Oval */
    border-radius: 50%; /* Makes it an oval/circle shape */
    padding: 80px 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    aspect-ratio: 1.5 / 1; /* Maintains the oval shape */
  }

  .warning-text {
    font-size: 1.2rem;
    line-height: 1.6;
    margin-bottom: 40px;
    max-width: 500px;
  }

  .choice-buttons {
    display: flex;
    gap: 100px; /* Space between Yes and No */
  }

  .choice-btn {
    background: linear-gradient(rgba(255, 255, 255, 0.2), rgba(0, 0, 0, 0.2));
    background-color: #245e38;
    color: white;
    border: 1px solid #444;
    padding: 10px 40px;
    font-size: 1.2rem;
    cursor: pointer;
    min-width: 120px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  }

  .choice-btn:hover {
    filter: brightness(1.2);
  }
</style>
