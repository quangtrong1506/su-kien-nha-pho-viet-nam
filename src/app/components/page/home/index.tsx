'use client';
import { useState } from 'react';
import CropImage from '../../crop-image';
import EndYearImage from '../../images/end-year';

const HomePageIndex = () => {
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [image, setImage] = useState<File>();
    const [cropImage, setCropImage] = useState<File>();
    const handleDownload = () => {
        if(!name || !description || !cropImage)
            return alert("Vui lòng đầy đủ thông tin")
        const canvas = document.getElementById("canvas-preview") as HTMLCanvasElement;
        if (!canvas) return 
        const dataUrl = canvas.toDataURL("image/jpeg");
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "Thiệp_mời_"+name.replaceAll(" ","_")+".jpeg";
        link.click();
      };
    return (
        <>
            <div className="w-full flex sm:justify-center items-center max-sm:flex-col gap-2">
                <div className="flex flex-col gap-2 mt-3 max-sm:w-full max-w-[500px] px-2">
                    <input
                        type="text"
                        className="border p-1 w-full"
                        placeholder="Nhập tên"
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />
                    <input
                        type="text"
                        className="border p-1 w-full"
                        placeholder="Nhập tên"
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}
                    />
                    <label className="border p-1 w-full" htmlFor="avatar-upload">
                        Chọn Avatar
                    </label>
                    <input
                        className="hidden"
                        id="avatar-upload"
                        type="file"
                        accept=".png,.jpg,.jpeg"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            e.currentTarget.value = '';
                            setImage(file);
                        }}
                    />
                    <button className="border p-1 w-full" onClick={()=>{
                        handleDownload()
                    }}>
                        Tải xuống
                    </button>
                </div>
                <div className="px-2 w-full sm:w-[500px]">
                    <EndYearImage fullname={name} description={description} image={cropImage} />
                </div>
            </div>
            <CropImage
                image={image}
                onCrop={(img) => {
                    setCropImage(img);
                }}
            />
        </>
    );
};

export default HomePageIndex;
