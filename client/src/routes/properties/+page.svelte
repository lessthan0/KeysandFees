<script lang="ts">
  // Start with an empty array to show the "no properties" view
  let properties: string | any[] | null | undefined = [];

  function handleLogout() {
    window.location.href = '/';
  }

  function goBack() {
    window.location.href = '/profile';
  }

  function goToAddProperty() {
    window.location.href = '/create-property';
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

      <h2 class="section-title">Current Properties</h2>

      {#if properties.length > 0}
        <div class="property-list">
          {#each properties as property, i}
            <div class="property-row">
              <div class="property-info">
                <span class="label">Property {i + 1}:</span>
                <span class="address">{property.address}</span>
              </div>
              <div class="action-buttons">
                <button class="action-btn">Add Tenant</button>
                <button class="action-btn">Edit Tenant</button>
                <button class="action-btn">Edit Property</button>
                <button class="action-btn">Delete Property</button>
              </div>
            </div>
          {/each}
        </div>
      {:else}
        <div class="empty-state">
          <p class="empty-msg">You Currently have no properties</p>

          <div class="center-add">
            <button class="oval-add-btn" on:click={goToAddProperty}>
              Click to add<br />Property
            </button>
          </div>
        </div>
      {/if}
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

  .list-container {
    width: 95%;
    max-width: 1200px;
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
    margin-bottom: 60px;
    font-weight: normal;
  }

  /* Empty State Styling */
  .empty-msg {
    font-size: 1.2rem;
    margin-bottom: 40px;
  }

  .center-add {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  .oval-add-btn {
    background-color: #1a472a;
    color: white;
    border: 1px solid #333;
    padding: 25px 50px;
    border-radius: 100px; /* High radius for that perfect oval */
    font-size: 1.1rem;
    line-height: 1.3;
    cursor: pointer;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
    transition: transform 0.2s;
  }

  .oval-add-btn:hover {
    transform: scale(1.05);
    background-color: #245e38;
  }

  /* List View Styling (for when properties exist) */
  .property-list {
    display: flex;
    flex-direction: column;
    gap: 30px;
    text-align: left;
  }
  .property-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .property-info {
    display: flex;
    gap: 20px;
    font-size: 1.1rem;
  }
  .action-buttons {
    display: flex;
    gap: 10px;
  }
  .action-btn {
    background: #1a472a;
    color: white;
    border: 1px solid #444;
    padding: 5px 10px;
    font-size: 0.8rem;
    cursor: pointer;
  }
</style>
