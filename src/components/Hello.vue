<template>
  <v-container>
    <div class="title-layout">
      <h2 class="add-user-title">User List</h2>
    </div>

    <v-container class="main-container">
      <div class="margin-padding-search-container">
        <div class="search-container">
          <div class="custom-search-box">
            <input
              class="custom-search-input"
              type="text"
              placeholder="Search for users..."
              :value="searchQuery"
              @input="updateSearchQuery"
            />
            <i class="fas fa-search green-magnifying-glass"></i>
          </div>
          <router-link
            :to="{ name: 'add-user', params: { id: usersNumber }}"
            class="add-user-btn"
          >
            <i
              class="fas fa-plus plus-icon"
              style="color: white; font-size: 0.7em; padding-left: 0.3em;"
            ></i>
            <span class="add-user-text">Add User</span>
          </router-link>
        </div>
      </div>

      <div class="margin-padding-container">
        <div class="user-item list-container">
          <span class="span-name user-name">Full Name</span>
          <span class="user-name">Actions</span>
        </div>

        <div v-for="user in paginatedUserList" :key="user.id" class="user-item list-container">
          <div class="user-details">
            <v-avatar>
              <v-img img :src="user.avatar ? user.avatar : avatarPreview"></v-img>
            </v-avatar>
            <div class="user-name">
              <span>{{ user.fullName }}</span>
            </div>
          </div>
          <div class="user-actions">
            <router-link :to="{ name: 'edit-user', params: { id: filteredUserList.indexOf(user) + 1 } }">
              <i class="fas fa-edit fa-xs" style="color: #c8bcbc; padding-right: 1em;"></i>
            </router-link>
            <button @click="deleteUser(user.id)">
              <i class="fa-solid fa-trash fa-xs" style="color: #c8bcbc;"></i>
            </button>
          </div>
        </div>
      </div>
    </v-container>

    <div class="pagination">
      <a href="#" @click="goToPrevPage">&laquo;</a>
      <a v-for="page in totalPages" :key="page" :class="{ active: page === currentPage }" @click="goToPage(page)">
        {{ page }}
      </a>
      <a href="#" @click="goToNextPage">&raquo;</a>
    </div>
  </v-container>
</template>

<script>

export default {
  data() {
    return {
      avatarPreview: null,
      avatar: null,
      searchQuery: '',
      currentPage: 1,
      itemsPerPage: 6, // Number of users per page
      
    };
  },

  computed: {
  //   getAvatarAltText() {
  //     return URL.createObjectURL(require("../assets/Avatar.png"));
  // },
    
    filteredUserList() {
      return this.$store.state.filteredUserList;
    },

    usersNumber() {
      return this.$store.state.userList.length + 1;
    },
    totalPages() {
      return Math.ceil(this.filteredUserList.length / this.itemsPerPage);
    },
    paginatedUserList() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.filteredUserList.slice(startIndex, endIndex);
    },
  },
  created() {
    if (this.$store.state.userList.length === 0) {
      this.$store.dispatch('fetchUserList');
    }
    this.preview()
  },
  methods: {
    preview(){
      this.avatarPreview = require('../assets/Avatar.png');
    },
  updateSearchQuery(event) {
      this.searchQuery = event.target.value;
      this.$store.dispatch('filterUserList', this.searchQuery);
    },
    deleteUser(userId) {
      this.$store.dispatch('deleteUser', userId);
      this.$store.dispatch('filterUserList', ' ');

    },
    goToPage(page) {
      this.currentPage = page;
    },
    goToPrevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    goToNextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
  },
};
</script>

<style>


/* .list-titles {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  padding-left: 5em;
} */

h2 {
  font-family: Arial, Helvetica, sans-serif;
  margin-left: 0;
  align-items: flex-start;
  margin-top: 2em;
}

.main-container { 
  /* display: flex; */
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  padding-top: 0em;
}

.margin-padding-search-container {
  background-color: #f5f5f5;
  /* padding: 0em 0em 0em 0em;
  margin: 0em 4em 0em 4em; */
  justify-content: space-between;
  display: block;
  /* align-items: flex-start; */
}

.margin-padding-container {
  min-height: 100%;
  justify-content: center;
  display: block;
  align-items: flex-start;
  /* padding: 0em 4em 2em 4em;
  margin: 0em 4em 0em 4em; */
}

.span-name {
  margin-left: 5.5em;
  padding-left: 20em;
}
/* .form-field-inline {

} */

.title-layout {
  background-color: #f5f5f5;
  /* padding: 0em 4em 2em 4em; */
  /* margin: 0em 4em 0em 4em; */
}

.add-user-title {
  align-items: flex-start;
  display: flex;
  top: 0.2em;
  font-weight: 400;
  font-size: 2rem;
  color: #544a4a;
  padding-bottom: 0.5em;
}



.list-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #fff;
  padding: 1em 1.5em;
  /* border-radius: 5px; */
  margin-top: 0em;

}

.white-plus-icon {
  color: white;
}

.add-user-text {
  color: white;
  padding: 0.2em 0.7em 0.2em 0.7em;

  font-size: 0.7em;
}

.search-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* display: flex; */
  /* flex-direction: row; */
  /* align-items: flex-start; */
  background-color: #ffffff;
  padding: 1.7em 1.5em 2em 1.5em;
  /* margin: 0em 4em 0em 4em; */
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */
  /* border-radius: 5px; */

}

.custom-search-box {
  display: flex;
  align-items: center;
  position: relative;
  background-color: #f5f5f5;
  line-height: 1.4;
  font-size: 0.7em;
  font-weight: bolder;
}

.custom-search-input {
  max-width: 100%;
display: block;  
width: 26em;
  padding: 5px;
  border: none;
  align-items: center;

}

.green-magnifying-glass {
  position: absolute;
  right: 5px;
  color: green;
  cursor: pointer;
  
}

.add-user-btn {
  background-color: green;
  color: transparent; /* Added */
  border: none;
  padding: 5px 10px;
  border-radius: 50px; /* Rounded corners */
  cursor: pointer;
  display: flex; /* Added */
  align-items: center; /* Added */
  float: right;
}

/* .add-user-btn i {
  color: transparent; 
} */

/* .user-list {
  display: flex;
  flex-direction: column;
} */

.user-item {
  display: flex;
  flex-direction: row;
  padding: 10px;
  justify-content: space-between;
  padding-right: 4.5em;
}



/* .user-avatar img {

  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
  
} */

.user-details {
  display: flex;
  align-items: center;
  padding-left: 1em;

}


.user-name {
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.7em;
  padding-left: 3em;
}

.user-actions {
  margin-left: 10px;
  padding: 5px 10px;
  /* background-color: red; */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  /* float: right; */
}

.pagination {
  display: inline-block;
  margin-top: 1em;
}

.pagination a {
  color: black;
  float: left;
  padding: 8px 16px;
  text-decoration: none;
}

.pagination a.active {
  background-color: #4CAF50;
  color: white;
}


.user-item:nth-child(even) {
  background-color: #f5f5f5;
}

.user-item:last-child {
  border-radius: 10px; /* Add this line */

}

@media (max-width: 600px) {
  .search-container {
    flex-direction: column;
  }

  .custom-search-box {
    margin-bottom: 10px;
  }
  .add-user-btn {
    margin-top: 1em;
  }


.user-item {

  padding-right: 1em;
}
}
</style>
