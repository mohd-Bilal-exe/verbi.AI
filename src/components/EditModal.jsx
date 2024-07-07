export default function EditModal({ attributes, onClose }) {
  return (
    <section className="absolute z-50 top-0 left-0 w-screen h-screen backdrop-blur-lg flex justify-center items-center">
      <div className="bg-black p-4 rounded-lg shadow-lg">
        <button
          onClick={onClose}
          className="mt-4 p-2 bg-red-500 text-white rounded"
        >
          Close
        </button>
      </div>
    </section>
  );
}
