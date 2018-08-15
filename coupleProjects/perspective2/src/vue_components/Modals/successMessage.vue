<template>
    <transition name="slideMessageBox">
        <div class="t-messageBoxWrapper">
            <div class="t-messageBoxClose" @click.prevent="hideModal">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.2" fill-rule="evenodd" clip-rule="evenodd" d="M3.41437 0.585938C2.63312 -0.195312 1.367 -0.195312 0.585754 0.585938C-0.195251 1.3667 -0.195251 2.6333 0.585754 3.41406L6.92169 9.75L0.585754 16.0859C-0.195251 16.8667 -0.195251 18.1333 0.585754 18.9141C1.367 19.6953 2.63312 19.6953 3.41437 18.9141L9.75006 12.5781L16.0858 18.9141C16.867 19.6953 18.1331 19.6953 18.9144 18.9141C19.6954 18.1333 19.6954 16.8667 18.9144 16.0859L12.5784 9.75L18.9144 3.41406C19.6954 2.6333 19.6954 1.3667 18.9144 0.585938C18.1331 -0.195312 16.867 -0.195312 16.0858 0.585938L9.75006 6.92188L3.41437 0.585938Z" transform="translate(0.25 0.25)" fill="#666666"/></svg>
            </div>
            <p>{{ message }}</p>
        </div>
    </transition>
</template>

<script>
    import { mapMutations, mapGetters } from 'vuex';
    export default {
        data() {
            return {

            }
        },
        computed: {
            ...mapGetters('modals',{
                message: 'message'
            })
        },
        methods: {
            ...mapMutations('modals',['hideModal']),
        },
        mounted() {

        }
    }
</script>

<style>

</style>