
import { categories } from "@/components/home/content-box-categories"
import type { CategoryTypes } from "@/components/home/content-box-categories"
export const GetCategoryOnHover = (param:string) : CategoryTypes | undefined =>{
     const find = categories.find(category=>param==category.videoPath)
        return find
        
}