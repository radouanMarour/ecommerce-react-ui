import instance from "../axios"

export const createCategory = async (body) => {
    try {
        const response = await instance.post('/categories', body)
        console.log(response)
        return response.data
    } catch (error) {
        return error.response.data
    }
}

export const getCategories = async () => {
    try {
        const response = await instance.get('/categories')
        return response.data
    } catch (error) {
        return error.response.data
    }
}

export const getSubcategories = async (parentId) => {
    try {
        const response = await instance.get(`/subcategories/${parentId}`)
        return response.data.data
    } catch (error) {
        return error.response.data.message
    }
}