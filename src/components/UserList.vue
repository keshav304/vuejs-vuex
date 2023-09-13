<template>
  <div>
    <button @click="toggleFormVisibility">Toggle Form</button>
    <button @click="this.$router.push('/user')">View Task 3</button>
    <div v-if="isFormVisible">
      <form class="form-container">
        <div class="form-group">
          <input class="small-input" v-model="filters.name" placeholder="Name" />
          <input class="small-input" v-model="filters.username" placeholder="Username" />
          <input class="small-input" v-model="filters.email" placeholder="Email" />
          <input class="small-input" v-model="filters.address.street" placeholder="Street" />
          <input class="small-input" v-model="filters.phone" placeholder="Phone" />
          <input class="small-input" v-model="filters.website" placeholder="Website" />
        </div>
      <div class="form-group">
        <button @click="applyFilters">Apply Filters</button>
        <button @click="clearFilters">Clear Filters</button>
      </div>
    </form>
    </div>


    <div class="user-card-container">
      <div class="user-card" v-for="user in paginatedUsers" :key="user.id">
        <div class="user-card-header">
          <h2 class="user-name">{{ user.name }}</h2>
        </div>
        <div class="user-card-body">
          <p><strong>Email:</strong> {{ user.email }}</p>
          <p><strong>Username:</strong> {{ user.username }}</p>
          <p><strong>Address:</strong> {{ user.address.street }}, {{ user.address.city }}</p>
          <p><strong>Zipcode:</strong> {{ user.address.zipcode }}</p>
          <p><strong>Phone:</strong> {{ user.phone }}</p>
          <p><strong>Website:</strong> {{ user.website }}</p>
        </div>
        <div class="user-card-footer">
          <button class="details-button">Details</button>
        </div>
      </div>
    </div>

    <div class="pagination">
      <button @click="prevPage" :disabled="pagination.currentPage === 1">Previous</button>
      <span>{{ pagination.currentPage }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="pagination.currentPage === totalPages">Next</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserList',
  data() {
      return {
        isFormVisible: false,
        filters: {
          name: '',
          username: '',
          email: '',
          address: {
            street: '',
          },
          phone: '',
          website: '',
        },
      };
    },
  computed: {
    paginatedUsers() {
      return this.$store.getters.paginatedUsers;
    },
    pagination() {
      return this.$store.state.pagination;
    },
    totalPages() {
      return this.$store.getters.totalPages;
    },
  },
  methods: {
    toggleFormVisibility() {
      this.isFormVisible = !this.isFormVisible; 
    },
    applyFilters(e) {
      e.preventDefault();
      this.$store.dispatch('applyFilters', this.filters);
    },
    prevPage() {
      this.$store.dispatch('setPage', this.pagination.currentPage - 1);
    },
    nextPage() {
      this.$store.dispatch('setPage', this.pagination.currentPage + 1);
    },
    clearFilters(e) {
      e.preventDefault();
      this.filters = {
        name: '',
        username: '',
        email: '',
        address: {
          street: '',
        },
        phone: '',
        website: '',
      };
      this.$store.dispatch('clearFilters');
    }
  },
  created() {
    this.$store.dispatch('fetchUsers');
  },
};
</script>
<style>
.user-card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 20px;
}

.user-card {
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 300px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.user-card-header {
  text-align: center;
  margin-bottom: 10px;
}

.user-name {
  font-size: 1.5rem;
}

.user-card-body {
  font-size: 1rem;
}

.user-card-footer {
  text-align: center;
  margin-top: 10px;
}

.details-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.details-button:hover {
  background-color: #0056b3;
}

.form-container {
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  transition: max-height 0.3s ease-out;
  overflow: hidden;
  margin-bottom: 20px
}

.form-group {
  margin-bottom: 20px;
}
.small-input {
  width: calc(16.666% - 10px); 
  padding: 8px;
  font-size: 1rem;
  margin-right: 10px; 
  margin-top: 10px;
}


button {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-right: 5px;
  margin-bottom: 10px;
}

button:hover {
  background-color: #0056b3;
}

</style>
