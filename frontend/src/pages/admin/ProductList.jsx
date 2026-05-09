import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const ProductList = () => {

  const { products, currency, axios, fetchProducts, navigate } = useContext(AppContext);

  const toggleStock = async (id, inStock) => {
    try {
      const { data } = await axios.post('/api/product/stock', { id, inStock });

      if (data.success) {
        fetchProducts();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="no-scrollbar flex justify-between h-[90vh] overflow-y-auto">

      <div className="w-full p-4 md:p-10">
        <h2 className="pb-4 text-lg font-semibold">All Products</h2>

        {/* Table Wrapper for mobile scroll */}
        <div className="bg-white border border-gray-200 rounded-md overflow-x-auto">

          <table className="w-full text-sm">

            {/* Table Head */}
            <thead className="text-gray-900 text-left">
              <tr>
                <th className="px-4 py-3 font-semibold">Product</th>
                <th className="px-4 py-3 font-semibold">Category</th>
                <th className="px-4 py-3 font-semibold">Price</th>
                <th className="px-4 py-3 font-semibold">Stock</th>
                <th className="px-4 py-3 font-semibold">Action</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="text-gray-500">

              {products.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-6">
                    No products found
                  </td>
                </tr>
              ) : (

                products.map((product) => (
                  <tr key={product._id} className="border-t border-gray-500/20">

                    {/* Product */}
                    <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                      <div className='rounded border border-gray-300'>
                        <img
                          src={product.image?.[0]?.url || product.image?.[0]}
                          alt="product"
                          className="w-14 h-14 object-cover"
                        />
                      </div>
                      <span className="truncate max-w-[150px] sm:max-w-xs">
                        {product.name}
                      </span>
                    </td>

                    {/* Category */}
                    <td className="px-4 py-2">
                      {product.category}
                    </td>

                    {/* Price */}
                    <td className="px-4 py-2">
                      {currency}{product.offerPrice}
                    </td>

                    {/* Stock Toggle */}
                    <td className="px-4 py-2">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={product.inStock}
                          onChange={() => toggleStock(product._id, !product.inStock)}
                          className="sr-only peer"
                        />

                        <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 transition"></div>

                        <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></span>
                      </label>
                    </td>

                    {/* Action */}
                    <td className="px-4 py-2">
                      <button
                        onClick={() => navigate(`/admin/edit/${product._id}`)}
                        className="text-blue-500 hover:underline cursor-pointer"
                      >
                        Edit
                      </button>
                    </td>

                  </tr>
                ))

              )}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductList;