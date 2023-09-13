<template>
    <div>
      <form  @submit.prevent="onSubmit">
        <div class="form" v-for="block in blocks" :key="block.token">
            <label>{{ block.props.title }}</label>
          <input
            :type="block.type"
            v-model="block.value"
            v-bind="block.props"
            placeholder="e.g. John Doe"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'UserDetails',
    data() {
      return {
        blocks: [
          {
            token: "PERSON_NAME",
            type: "text",
            props: {
              title: "Enter your name",
              placeholder: "e.g. John Doe",
              required: true,
            },
          },
          {
            token: "IS_PERSON_MINOR",
            type: "checkbox",
            props: {
              title: "Is the current person minor?",
              default: false,
            },
          },
          {
            token: "PERSON_DOB",
            type: "date",
            props: {
              title: "Enter your BOD",
              required: "IS_PERSON_MINOR",
              placeholder: "e.g. 01/01/2000",
            },
          },
        ],
      };
    },
    methods: {
      onSubmit() {
        const errors = this.validateForm();
        if (errors.length) {
          // Show the errors to the user
          this.$toast.error(errors);
          return;
        }
  
        this.$emit("submit", this.blocks);
      },
      validateForm() {
        const errors = [];
        for (const block of this.blocks) {
          if (block.required && !block.value) {
            errors.push(`${block.title} is required`);
          }
        }
        return errors;
      },
    },
  };
  </script>
<style>
.form {
    width: 100%;
    max-width: 40%;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    justify-content: space-between;
    display: flex;
}
.form div {
    margin-bottom: 20px;
}
.form div label {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
}

.form div input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  outline: none;
}

form button {
    margin-top: 15px;
}
</style>