var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
onMounted(() => __awaiter(void 0, void 0, void 0, function* () {
    const search = new Search();
    const p = yield search.search(props.index, props.query);
    data = p.hits;
    emit("search", p.hits);
}));
