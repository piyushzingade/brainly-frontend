

interface ModalProps {
    open: boolean;
    onClose: () => void;
}
export function EditContentModal({ open, onClose }: ModalProps) {


    return open && <div onClick={onClose} className="fixed inset-0  z-[1000] grid place-items-center overflow-auto bg-opacity-90 backdrop-blur-sm transition-all duration-300">


        <div className="border text-white p-6 bg-black h-[500px] w-[500px]">

<h1>Edit your content</h1>
        </div>
    </div>
}