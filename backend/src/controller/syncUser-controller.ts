import User from "../models/user.model";


export const syncUser = async (req: any, res: any) => {
    const {clerkId, email, username, profileImgUrl} = req.body;
    try{
        let user  = await User.findOne({
            clerkId
        })
        if(user){
            // Update existing user
            user.email = email;
            user.username = username;
            user.profileImgUrl = profileImgUrl;
            await user.save();
        }else{
            // Create new user
            user = new User({
                clerkId,
                email,
                username,
                profileImgUrl
            });
            await user.save();
        }
        res.status(200).json(user);
    }catch(error){
        res.status(500).json({message: "Internal Server Error"});
    }
}