import express from 'express';
import bcrypt from 'bcrypt';
import config from '../config';
import logger from '../logger';
import * as EmailService from "../services/smtp.service";
import UserService from './user.service';


const userService = new UserService(config.database)

export const signup = async (
    req:express.Request | any,
    res:express.Response
) => { 
  const salt = bcrypt.genSaltSync(10);
  const hashPass = bcrypt.hashSync(req.body.password, salt);
      const user = {
        user_name:req.body.user_name,
        email:req.body.email,
        password:hashPass

    }
    const dupicateEmail:any = await userService.findUser({email:req.body.email})
    if(dupicateEmail){
        logger.info("THIS MAIL ID ALREADY EXISTS")
        return res.status(500).json({
            message:"THIS MAIL ID ALREADY EXISTS"
        })
    }
    userService.create(user).then(async(createUser:any) =>{
        // Send email to user for onboard
        //console.log(config.smtpConfig.email);
        
        const mailOptions = {
            from: config.smtpConfig.email,
            to: createUser.email,
            subject: "Thank you for registration",
            html: `Thank you for registration
             <h3 style="color:DodgerBlue;">Thank you for registration</h3>`,
          };
          const sendEmail = await EmailService.sendMail(mailOptions);
          if (sendEmail) {
            logger.info(
              `Email has been sent successfully to user ${createUser.email}`
            );
          }
            return res.status(200).json({
                message:"Register Successfully",
                success:true
            })
    }).catch((error:Error) => {
        logger.info("ERROR_IN_CREATING_USER")
        return res.status(500).json({
            message:"ERROR_IN_CREATING_USER",
            success:false
        })
    })
}

export const login = async(
    req:express.Request | any,
    res:express.Response
) => {
    const query:any = {
        email:req.body.email,
    }
    const user:any = await userService.findUser(query)
   
    
   const match = bcrypt.compareSync(req.body.password,user.password);
    if(match){
        logger.info("Login successfully")
        return res.status(200).json({
            message:"Login successfully",
            success:true
        })
    }else{
        return res.status(500).json({
            message:"USER_NOT_FOUND",
            success:false
        })
    }
}

