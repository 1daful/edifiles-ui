import { onMounted } from "vue";
import { Search } from "../../edifiles/src/Search/Search";
let mediaType;
let items;
const emit = defineEmits(["search"]);
const props = defineProps({
    query: {
        type: String,
        required: true,
    },
    index: {
        type: String,
        required: true,
    },
});
let data;
onMounted(async () => {
    const search = new Search();
    const p = await search.search(props.index, props.query);
    data = p.hits;
    emit("search", p.hits);
});
