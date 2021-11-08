import React from 'react'
import { List, ListItemText, Paper, ListItem, ListItemSecondaryAction, IconButton, ButtonGroup, Button, makeStyles } from '@material-ui/core';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import { roundToDecimalPoint } from "../../utilis"

const useStyles = makeStyles(theme => ({
    paperRoot: {
        margin: '15px 0px',
        '&:hover': {
            cursor: 'pointer'
        },
        '&:hover $deleteButton': {
            display: 'block'
        }
    },
    buttonGroup: {
        backgroundColor: '#E3E3E3',
        borderRadius: 8,
        '& .MuiButtonBase-root ': {
            border: 'none',
            minWidth: '25px',
            padding: '1px'
        },
        '& button:nth-child(2)': {
            fontSize: '1.2em',
            color: '#000'
        }
    },
    deleteButton: {
        display: 'none',
        '& .MuiButtonBase-root': {
            color: '#E81719'
        },
    },
    totalPerItem: {
        fontWeight: 'bolder',
        fontSize: '1.2em',
        margin: '0px 10px'
    }
}))

export default function OrderedFoodItems (props) 
{
    const { orderedFoodItems , removeFoodItem, values , setValues } = props;
   const classes =  useStyles(); 

    const updateQuantity = (idx , value)=>{
        let x = { ...values };
        x.orderDetails[idx].quantity += value;
        setValues({ ...x });

    }

    

    return(

        <List>
            {
              orderedFoodItems.map( (item , idx) =>(
            
                    <Paper key ={idx} className = {classes.paperRoot}>
                          <ListItem>
                            <ListItemText
                             primary={item.foodItemName}
                                primaryTypographyProps={{
                                    component: 'h1',
                                    style: {
                                        fontWeight: '500',
                                        fontSize: '1.2em'
                                    } 
                             
                             }} 
                             secondary= {
                                 <>
                                  < ButtonGroup className = {classes.buttonGroup}
                                        size = "small">
                                            <Button
                                            onClick = {e => updateQuantity(idx , -1)}
                                            >-</Button>
                                            <Button
                                            disabled>
                                                {item.quantity}
                                            </Button>
                                            <Button
                                             onClick = {e => updateQuantity(idx , 1)}
                                             >+</Button>
                                        </ButtonGroup>
                                        <span className = {classes.totalPerItem}>
                                            {'Rs' + roundToDecimalPoint(item.quantity * item.foodItemPrice)}
                                        </span>
                                 </>
                             }
                             secondaryTypographyProps ={{
                                 component: 'div'
                             }}

                             
                           />
                           <ListItemSecondaryAction
                           className = {classes.deleteButton}>
                               <IconButton
                               onClick = { e => removeFoodItem(idx , item.orderDetailsId)}
                               >
                                   <DeleteTwoToneIcon/>
                               </IconButton>
                           </ListItemSecondaryAction>
      
                             </ListItem>
                             </Paper>
                  

                   
                ))
            }

            </List>
               
                    

    );
};

                        
             
             
    
