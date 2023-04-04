<template>
  <div>

          <form @submit.prevent="sendData" class="form">
            <span>All object: {{GET_ALL_PERSONS.length}}</span>
            <label class="form__label" for="Name">Name</label>
            <input class="form__input" v-model="formData.name_uz" type="text" >

            <label class="form__label" for="cost">Cost</label>
            <input class="form__input" v-model="formData.cost" type="number">

            <label class="form__label" for="Adrress">Adrress</label>
            <input class="form__input" v-model="formData.address" type="text" >

            <button  class="form__btn" type="submit">Отправить</button>
            <span>{{textWarning}}</span>
          </form>
          <div>
                  <template v-if="!formEditor">
                    <div class="wrapper" v-for="(row, index) in GET_ALL_PERSONS" :key="index">
                        <div class="date">
                        <span>Name:</span>
                        <span>{{row.name_uz}}</span>

                      </div>
                      <div class="date">
                        <span>Cost:</span>

                        <span>{{row.cost}}</span>

                      </div>
                      <div class="date">
                        <span>Address:</span>
                        <span>{{row.address}}</span>

                      </div>
                      <q-btn class="btn-remove" @click="remove(row.id)" color="primary" label="Delete" />
                      <q-btn class="btn-remove" @click="editInput(row)" color="primary" label="Edit" />
                    </div>
                  </template>
                    <template v-else>
                      <div  class="wrapper">
                        <div class="date">
                        <span>Name:</span>
                        <input type="text" v-model="updateData.name_uz">
                        </div>
                        <div class="date">
                          <span>Cost:</span>
                          <input type="number"  v-model="updateData.cost">
                        </div>
                        <div class="date">
                          <span>Address:</span>
                          <input type="text" v-model="updateData.address" >
                        </div>
                        <q-btn class="btn-remove" @click="updateDataForm" type="submit" color="primary" label="Save" />
                        <q-btn class="btn-remove" @click="cancelInput" color="primary" label="Cancel" />
                      </div>
                    </template>                            
          </div>
  </div>

</template>

<script>
import {mapGetters, mapActions, mapState} from 'vuex' 
export default{
    data() {
      return {
        formEditor: false,
        textWarning: '',
        formData: {
          product_type_id: Math.random() * 0b1000000 << 0,
          name_uz: '',
          cost: null,
          address: '',
          created_date: new Date().toISOString()
        },
        updateData: {
            id: null,
            product_type_id: Math.random() * 0b1000000 << 0,
            name_uz: '',
            cost: null,
            address: '',
            created_date: new Date().toISOString()
        }
      }
    },
    computed: {
      ...mapState('person', {
        Person: state => state.personData
      }),
      ...mapGetters('person', ['GET_ALL_PERSONS']),
    },
    methods: {
      ...mapActions('person', ['FETCH_PERSON', 'DELETE_PERSON', 'ADD_TO_COLLECT', 'UPDATE_TO_COLLECT' ]),
      sendData() {
        if(this.formData.name_uz === '' || this.formData.address === ''  ||  this.formData.cost  === null) {
         this.textWarning = 'Ну напиши сюда что нибудь плиз'
        }
        else {
          this.ADD_TO_COLLECT(this.formData)
          location.reload()
          this.textWarning = ''
        }

      },
      remove(res) {
        this.DELETE_PERSON(res)
      },
      editInput(resp) {
        this.formEditor = true
        this.updateData.product_type_id = resp.product_type_id
        this.updateData.id = resp.id
      },
      cancelInput() {
        this.formEditor = false
      },
      updateDataForm() {
        this.UPDATE_TO_COLLECT(this.updateData)
        location.reload()
      }
    },

    mounted() { 
      this.FETCH_PERSON(this.updateData)
    }
  }

</script>
<style lang="scss">
  .table-data { 
    margin: 2px;
    .last-item {
      border: 0px;
    }
  }
  .date {
    min-width: 200px;
    height: 100%;
    font-size: 18px;
    span {
      margin: 2px;
    }
  }
  .btn-remove {
    width: 100px;
    height: 20px;
    margin-left: 10px;
  }
  .wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .mainWrapper {  
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }
  .btn-save {
    width: 200px;
    margin-top: 10px;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  li {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
  }
  .form {
  max-width: 400px;
  margin: auto;
  padding: 40px;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);
  
  &__title {
    margin-bottom: 20px;
    font-size: 22px;
    font-weight: bold;
    text-align: center;
  }
  
  &__label {
    display: block;
    margin-bottom: 8px;
    font-size: 14px;
    color: #333;
  }
  
  &__input {
    display: block;
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #f5f5f5;
    transition: 0.3s border-color, 0.3s box-shadow;
    
    &:focus {
      outline: none;
      border-color: #007acc;
      box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.2);
    }
  }
  
  &__btn {
    display: block;
    margin-top: 20px;
    padding: 12px 20px;
    border: none;
    border-radius: 4px;
    color: #fff;
    background-color: #007acc;
    cursor: pointer;
    transition: 0.3s background-color;
    
    &:hover {
      background-color: #0062a1;
    }
  }
}

</style>
