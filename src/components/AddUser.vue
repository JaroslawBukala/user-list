<template>
  <v-container>
    <div class="title-layout">
      <h2 class="add-user-title">Add User</h2>
    </div>
    <div class="main-container">
      <v-container class="add-user-section">
        <form @submit.prevent="addUser">
          <div class="flex">
            <div class="form-field-inline">
              <label for="firstName">First Name:</label>
              <input type="text" v-model="firstName" required>
            </div>
            <div class="form-field-inline">
              <label for="lastName">Last Name:</label>
              <input type="text" v-model="lastName" required>
            </div>
          </div>
          <button type="submit" class="update-button">Update Details</button>
        </form>
      </v-container>
      <div class="margin"></div>
      <v-container class="add-avatar-section">
        <div class="avatar-container">
          <v-avatar class="avatar-placeholder">
            <img v-if="avatarPreview" :src="avatarPreview" class="avatar-image" alt="Avatar">
            <input type="file" ref="fileInput" style="display: none" @change="handleFileChange">
          </v-avatar>
        </div>
        <button class="add-photo-button" @click="openFileDialog">Add Photo</button>
      </v-container>
    </div>
  </v-container>
</template>


<script>
export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      avatar: "",
      avatarPreview: null,
    };
  },
  computed: {
    userId() {
      return this.$route.params.id;
    },
  },
  methods: {
    addUser() {
      const newUser = {
        id: this.userId,
        first_name: this.firstName,
        last_name: this.lastName,
        avatar: this.avatar,
      };

      try {
        this.$store.dispatch("createUser", newUser);
        this.$router.push({ name: "home" });
      } catch (error) {
        console.error("Failed to add user:", error);
      }

      // Clear the form inputs after successful submission
      this.firstName = "";
      this.lastName = "";
      this.avatar = "";
      this.avatarPreview = null;
    },
    openFileDialog() {
      this.$refs.fileInput.click();
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        console.log(file);
        this.avatarPreview = URL.createObjectURL(file);
        this.avatar = URL.createObjectURL(file);
      } else {
        console.log(this.avatarImage);
        this.avatarPreview = URL.createObjectURL(require("../assets/Avatar.png"));
        this.avatar = URL.createObjectURL(require("../assets/Avatar.png"));
      }
    },
  },
};
</script>

<style scoped>
.margin {
  padding: 1em;
}
h2 {
  font-family: Arial, Helvetica, sans-serif;
  margin-left: 0;
  align-items: flex-start;
  margin-top: 2em;
}


label {
  display: inline-block;
  width: auto;
}

input {
  display: flex;
  width: 99%; /* Adjust the width as needed */
}

form input {
  font-family: Arial, Helvetica, sans-serif;
  flex: 1;
  padding: 0.4em;
  border: 1px solid #ccc;
  border-radius: 3px;
  line-height: 1.4;
  font-size: 0.8em;
}

.flex {
  display: flex;
}

.margin {
  padding: 1.1em;
  background-color: #f5f5f5;

}

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


.main-container { 
  /* display: flex; */
  display: flex;
  justify-content: space-between;
  background-color: #f5f5f5;

  /* border-radius: 5px; */
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */
}


.add-user-section {
  justify-content: center;
  flex: 2;
  background-color: #fff;
  border-radius: 5px;
  /* padding: 1em 1.5em; */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 0em;
  margin-bottom: 0em;
  min-width: 7em;
}

.add-avatar-section {
  justify-content: center;
  flex: 1;
  background-color: #fff;
  border-radius: 5px;
  padding: 1em;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  min-width: 7em;
}

.form-field-inline {
  width: 100%; /* Adjust the width as needed */
  /* margin-right: 50%;  */
  display: inline-block;
  align-items: center;
  margin-right: 0m;
  margin-top: 3.2em;
  vertical-align: middle;
}

.form-field-inline label {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.7em;
  font-weight: bolder;
  flex: 0 0 30%;
  margin-bottom: 0.625em; /* Added margin-right to create space between label and input */
  display: block;
}

.form-field label {
  display: block;
  margin-bottom: 5px;
  font-weight: 400;
  font-size: 0.875rem;
  color: #000;
}

.update-button {
  font-family: Arial, Helvetica, sans-serif;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 3px;
  padding: 0.7em 1em;
  cursor: pointer;
  margin-top: 10em;
  position: relative; /* Use position: absolute */
  font-size: 0.7em;
padding-top: 0.8em;
  padding-bottom: 0.5em;
}



.avatar-container {
  margin-top: 2.1em;
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar-placeholder {
  display: flex;
  background-image: url("../assets/Avatar.png");
  width: 7em;
  height: 7em;
  background-color: #f5f5f5;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 1px solid #ccc;
  background-size: cover;
}

.avatar-image {
  width: 7em;
  height: 7em;
  border-radius: 50%;
  object-fit:fill;
}

.camera-icon {
  width: 1.875em;
  height: 1.875em;
  /* background-image: url('path/to/camera-icon.png'); */
  background-size: cover;
}

.add-photo-button {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.7em;
  background-color: transparent;
  border: 1px solid #ccc;
  border-radius: 3px;
  color: #000;
  cursor: pointer;
  width: 100%;
  margin-top: 5.55em;
  padding-top: 0.8em;
  padding-bottom: 0.5em;
}


/* Media Query for Tablets and iPads */
@media (max-width: 1024px) {
  .add-photo-button {
    margin-top: 1.3em;
  }

  .update-button {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.7em;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 3px;
  padding: 0.7em 1em;
  width: 100%;
  cursor: pointer;
  margin-top: 0em;
  position: relative; /* Use position: absolute */
}
.add-photo-button {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.7em;
  background-color: transparent;
  border: 1px solid #ccc;
  border-radius: 3px;
  color: #000;
  cursor: pointer;
  width: 100%;
  margin-top: 5.55em;
  padding-top: 0.8em;
  padding-bottom: 0.5em;
}
 
  .flex {
    display: inline-block;
    flex-direction: column;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: auto;
  /* align-self: flex-end; */
  position: sticky; /* Use position: sticky instead of position: relative */
  bottom: 0; /* Add bottom: 0 to position the button at the bottom */
  }

  .form-field-inline {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 15px;
    width: 100%;
  }

  .form-field-inline label {
    flex: 0 0 30%;
    margin-right: 1em;
    margin-top: 0em;
  }

  .form-field-inline input {
    flex: 1;
    padding: 0.5em;
    border: 1px solid #ccc;
    border-radius: 3px;
  }

  .main-container {
    display: flex;
    flex-direction: row;
  }

  .add-avatar-section {
    display: flex;
    flex-direction: column;
  }
  .form-field-inline {
    width: 100%;
    margin-top: 0em;
  }
}

@media (max-width: 500px) {

  .avatar-container {
  margin-top: 1em;
}

.add-photo-button {
    margin-top: 1em;
  }
  .main-container {
    display: flex;
    flex-direction: column;
    margin-left: 1em;
  }

  .add-user-section {
    width: 100%;
    flex: 0;
    display: flex;
    flex-direction: column;
    margin-top: 1em;
    margin-left: 0em;
  }
  .add-avatar-section {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-top: 0em;
    margin-top: 1em;
    margin-left: 0em;
  }
  .form-field-inline {
    width: 100%; 
  }
  .margin {
    display: none;
  }
  .main-container {
    padding: 0em 0em 0em 0em;
  }
  .form-field-inline {
    padding: 0.1em;
  }


}
</style>
