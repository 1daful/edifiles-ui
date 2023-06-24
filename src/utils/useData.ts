import { Recommender } from "@edifiles/services";
import { DataSource, DataType } from "./types";

const recomm = new Recommender()
const latest =  async () => {
    let data = await recomm.getLatest()
    

}
const data: DataSource = {
    name: "latest",
    content: [],
    navType: "x-nav"
}
