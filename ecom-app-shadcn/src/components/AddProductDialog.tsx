import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { addProduct } from "@/api/Api";
import { Product } from "@/types/ProductTypes";

interface AddProductDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddProductDialog: React.FC<AddProductDialogProps> = ({ isOpen, onOpenChange }) => {
  const [newProduct, setNewProduct] = useState<Product>({
    id:21,
    title: "",
    category: "",
    description: "",
    image: "",
    price: 0,
    quantity: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
        ...prev,
        // [name]: name === "price" ? Number(value) : value,
        [name]: name === "price" ? (value === "" ? "" : Number(value)) : value,
      }));
  };

  const handleAddProduct = async() => {
    try{
        const response = await addProduct(newProduct);
        alert(`Product added successfully! \n Status: ${response.status}`);
    }
    catch(error){
        alert("Failed to delete product. Please try again.");
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="default">Add Product</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
        </DialogHeader>
        
        <Label>Title</Label>
        <Input name="title" value={newProduct.title} onChange={handleInputChange} placeholder="Enter title" />
        
        <Label>Category</Label>
        <Input name="category" value={newProduct.category} onChange={handleInputChange} placeholder="Enter category" />
        
        <Label>Description</Label>
        <Textarea name="description" value={newProduct.description} onChange={handleInputChange} placeholder="Enter description" />
        
        <Label>Image URL</Label>
        <Input name="image" value={newProduct.image} onChange={handleInputChange} placeholder="Enter image URL" />
        
        <Label>Price</Label>
        <Input name="price" type="number" value={newProduct.price} onChange={handleInputChange} placeholder="Enter price" />

        <Button className="mt-2" onClick={handleAddProduct}>Submit</Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductDialog;
