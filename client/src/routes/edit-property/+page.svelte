<script lang="ts">
  // Example data for a specific property (eventually from your database)
  let streetAddress = '81 County Road';
  let rooms = 3;
  let baths = 2;
  let petFriendly = 'Yes';
  let fencedBackyard = 'Yes';
  let yearBuilt = '2015';
  let rentAmount = '1200';

  function handleSaveChanges() {
    console.log('Updating property:', streetAddress);
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
      <button class="back-link" on:click={goBack}>Back</button>

      <h2>Edit Page - {streetAddress}</h2>

      <form on:submit|preventDefault={handleSaveChanges}>
        <div class="input-row">
          <label>Number of Rooms:</label>
          <input type="number" bind:value={rooms} />
        </div>
        <div class="input-row">
          <label>Number of Bathrooms:</label>
          <input type="number" bind:value={baths} />
        </div>
        <div class="input-row">
          <label>Pet Friendly (Yes/No):</label>
          <input type="text" bind:value={petFriendly} />
        </div>
        <div class="input-row">
          <label>Fenced in Backyard (Yes/No):</label>
          <input type="text" bind:value={fencedBackyard} />
        </div>
        <div class="input-row">
          <label>Year Built:</label>
          <input type="text" bind:value={yearBuilt} />
        </div>
        <div class="input-row">
          <label>Amount of Rent:</label>
          <input type="text" bind:value={rentAmount} />
        </div>

        <div class="edit-footer">
          <div class="upload-box">
            <p>(Add Pictures)</p>
            <p>DRAG HERE</p>
          </div>

          <button type="submit" class="oval-btn">Save Changes</button>
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
    overflow-y: auto;
  }

  .form-container {
    width: 100%;
    max-width: 800px;
    padding: 20px;
    position: relative;
  }

  .back-link {
    background: none;
    border: none;
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
    position: absolute;
    left: 20px;
    top: 0;
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 40px;
    text-align: center;
    font-weight: normal;
  }

  .input-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin-bottom: 15px;
  }
  label {
    width: 250px;
    text-align: right;
    font-size: 1.1rem;
  }
  input {
    width: 300px;
    padding: 5px;
    background: transparent;
    border: none;
    border-bottom: 1px solid white;
    color: white;
    text-align: center;
  }

  .edit-footer {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 50px;
    padding-bottom: 30px;
  }

  .upload-box {
    width: 250px;
    height: 150px;
    border: 2px solid white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 0.9rem;
  }

  .oval-btn {
    background: linear-gradient(#1e4d2b, #11311c);
    color: white;
    border: 1px solid #333;
    padding: 15px 60px;
    border-radius: 50px;
    font-weight: bold;
    cursor: pointer;
    transition: filter 0.2s;
  }

  .oval-btn:hover {
    filter: brightness(1.2);
  }
</style>
