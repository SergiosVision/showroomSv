<template>
    <div class="t-smallDialogWrapper">
        <div @click="hideModalSmall() + clearAll()" class="t-smallDialogClose">
            <svg class="small" width="10" height="10" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.691.29a.99.99 0 1 0-1.4 1.401L3.598 5 .29 8.309a.99.99 0 1 0 1.401 1.4l3.31-3.308L8.308 9.71a.99.99 0 1 0 1.4-1.4L6.402 5 9.71 1.692A.99.99 0 1 0 8.309.29L5 3.599 1.691.29z" fill="#2574CF"/></svg>
            <svg class="big" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.41406 0.585938C2.63281 -0.195312 1.36719 -0.195312 0.585938 0.585938C-0.195312 1.3667 -0.195312 2.6333 0.585938 3.41406L11.1699 13.998L0.585938 24.5815C-0.195312 25.3623 -0.195312 26.6289 0.585938 27.4097C1.36719 28.1909 2.63281 28.1909 3.41406 27.4097L13.998 16.8257L24.582 27.4097C25.3633 28.1909 26.6289 28.1909 27.4102 27.4097C28.1914 26.6289 28.1914 25.3623 27.4102 24.5815L16.8262 13.998L27.4102 3.41406C28.1914 2.6333 28.1914 1.3667 27.4102 0.585938C26.6289 -0.195312 25.3633 -0.195312 24.582 0.585938L13.998 11.1699L3.41406 0.585938Z" transform="translate(10.002 10.002)" fill="#2574CF"/>
            </svg>
        </div>
        <div class="t-overlay" @click="hideModalSmall() + clearAll()">
            <div @click="hideModalSmall() + clearAll()" class="t-smallDialogClose">
                <svg class="small" width="10" height="10" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.691.29a.99.99 0 1 0-1.4 1.401L3.598 5 .29 8.309a.99.99 0 1 0 1.401 1.4l3.31-3.308L8.308 9.71a.99.99 0 1 0 1.4-1.4L6.402 5 9.71 1.692A.99.99 0 1 0 8.309.29L5 3.599 1.691.29z" fill="#2574CF"/></svg>
            </div>
        </div>
        <div class="t-smallDialogCard">
            <div class="t-smallDialogTitleWrapper">
                <h3>Обратная связь</h3>
            </div>
            <div class="t-smallDialogFormWrapper">
                <form>
                    <div class="t-inputsHolderWrapper">
                        <div class="t-inputHolder" v-for="(item, index) in form">
                            <label :for="item.name">{{ item.title }}</label>
                            <input v-model="item.value" :id="item.name" :type="item.type">
                            <transition name="mainFade">
                                <div class="t-errorBox" v-if="item.error">
                                    <span>{{ item.errorMessage }}</span>
                                </div>
                            </transition>
                        </div>
                    </div>
                    <div class="t-btnAndAgreement">
                        <div class="t-smallDialogSendBtnHolder">
                            <button @click.prevent="sendData" class="t-btn t-moreBtn" type="button">Отправить сообщение</button>
                        </div>
                        <div class="t-smallDialogSendAgreementHolder">
                            <p>Нажимая кнопку «Отправить сообщение» Вы соглашаетесь с правилами обработки персональных данных</p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>



<script>
    import { mapState, mapMutations, mapGetters } from 'vuex';
    export default {
        name: 'FeedbackDialog',
        data() {
            return {
                form: [
                    {
                        title: 'Ваше имя',
                        value: '',
                        name: 'name',
                        error: false,
                        type: 'text',
                        pattern: '',
                        errorMessage: 'Укажите имя'
                    },
                    {
                        title: 'Электронная почта',
                        value: '',
                        name: 'mail',
                        error: false,
                        type: 'email',
                        pattern: /^[^@]+@[^@.]+\.[^@]+$/,
                        errorMessage: 'Укажите корректную почту',
                    },
                    {
                        title: '  Сообщение',
                        value: '',
                        name: 'message',
                        error: false,
                        type: 'text',
                        pattern: '',
                        errorMessage: 'Укажите сообщение'
                    },
                ],
            }
        },
        methods: {
            ...mapMutations('smallModal',['hideModalSmall']),
            ...mapMutations('modals',['hideModal', 'showModal', 'successMessageBox', 'errorMessageBox']),
            clearAll() {
                this.form.forEach((data, index) => {data.value = '';})
            },
            messageBoxHold() {
                setTimeout(() => {
                    this.hideModal();
                },7000)
            },
            successState() {
                this.hideModalSmall();
                this.clearAll();
                this.successMessageBox();
                this.showModal();
                this.messageBoxHold();
            },
            errorState() {
                this.clearAll();
                this.hideModalSmall();
                this.errorMessageBox();
                this.showModal();
                this.messageBoxHold();
            },
            sendData() {
                let valid = true;
                this.form.forEach((data, i) => {
                    data.error = false;
                    if(data.value === '') {
                        data.error = true;
                        valid = false;
                    } else {
                        if(data.pattern !== '') {
                            if(!data.pattern.test(data.value)) {
                                data.error = true;
                                valid = false;
                            }
                        }
                    }
                });
                if(valid) {
                    let formData = new FormData();
                    this.form.forEach((data, i) => {
                        formData.append(data.name, data.value);
                    });
                    this.$http.post('/PHP/enroll.php', formData, {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    })
                        .then(response => {
                            this.successState();
                        }, error => {
                            this.errorState();
                        })
                }
            },
        },
        mounted() {

        },
        computed: {
            ...mapGetters('modals',{
                visible: 'callModalVis',
            }),
        }
    }
</script>

<style>

</style>