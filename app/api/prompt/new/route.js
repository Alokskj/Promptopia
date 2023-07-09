import Prompt from "@models/prompt"
import { connectToDB } from "@utils/database"

export const POST = async (req, res) =>{
    const {userId, tag, prompt} = await req.json()
    try {
        await connectToDB()
        const newPrompt = new Prompt({
            prompt : prompt,
            creator : userId,
            tag : tag
        })
        await newPrompt.save()
        return new Response(JSON.stringify(newPrompt), {status : 201})
    } catch (error) {
        return new Response('Failed to create new Prompt', {status: 500})
    }
}