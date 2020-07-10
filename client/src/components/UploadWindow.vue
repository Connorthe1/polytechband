<template>
    <div class="example-simple">
        <div class="upload">
            <ul>
                <li v-for="(file) in files" :key="file.id">
                    <span>{{file.name}}</span> -
                    <span>{{file.size | formatSize}}</span> -
                    <span v-if="file.error">{{file.error}}</span>
                    <span v-else-if="file.success">success</span>
                    <span v-else-if="file.active">active</span>
                    <span v-else-if="file.active">active</span>
                    <span v-else></span>
                </li>
            </ul>
            <div class="example-btn">
                <file-upload
                        class="btn btn-primary"
                        extensions="mpeg"
                        accept="audio/mpeg"
                        :multiple="true"
                        :size="1024 * 1024 * 10"
                        v-model="files"
                        @input-filter="inputFilter"
                        @input-file="inputFile"
                        ref="upload">
                    <i class="fa fa-plus"></i>
                    Select files
                </file-upload>
                <button type="button" class="btn btn-success" @click="upload">
                    <i class="fa fa-arrow-up" aria-hidden="true"></i>
                    Start Upload
                </button>
            </div>
        </div>
    </div>
</template>
<style>
    .example-simple label.btn {
        margin-bottom: 0;
        margin-right: 1rem;
    }
</style>

<script>
    import FileUpload from 'vue-upload-component'
    export default {
        components: {
            FileUpload,
        },
        data() {
            return {
                files: [],
            }
        },
        methods: {
            inputFilter(newFile, oldFile, prevent) {
                if (newFile && !oldFile) {
                    // Before adding a file
                    // Filter system files or hide files
                    if (/(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(newFile.name)) {
                        return prevent()
                    }
                    // Filter php html js file
                    if (/\.(php5?|html?|jsx?)$/i.test(newFile.name)) {
                        return prevent()
                    }
                }
            },
            inputFile(newFile, oldFile) {
                if (newFile && !oldFile) {
                    // add
                    console.log('add', newFile)
                }
                if (newFile && oldFile) {
                    // update
                    console.log('update', newFile)
                }
                if (!newFile && oldFile) {
                    // remove
                    console.log('remove', oldFile)
                }
            },
            upload(){
                th
            }
        }
    }
</script>
