"use client";

import ProductImage from "@/components/ProductImage";
import { Dialog } from "@headlessui/react";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Modal() {
  const [isOpen, setIsOpen] = useState(true);
  const id = useParams().id;
  const [product, setProduct] = useState<Product>();
  const [isLoading, setIsisLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchProduct() {
      setIsisLoading(true);
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      const product = await res.json();

      setProduct(product);

      setIsisLoading(false);
    }

    try {
      fetchProduct();
    } catch {
      console.log("Error");
    }
  }, [id]);

  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        setIsOpen(false);
        router.back();
      }}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-3xl rounded bg-white p-10">
            {isLoading ? (
              <div className="h-8 w-8 rounded-full border-2 border-dotted border-yellow-600 animate-spin" />
            ) : (
              <div className="flex gap-x-8 h-96">
                {product?.image && (
                  <div className="relative w-72 h-full hidden md:inline">
                    <ProductImage product={product} fill />
                  </div>
                )}
                <div className="flex-1 flex flex-col">
                  <div className="flex-1">
                    <h4 className="font-semibold">{product?.title}</h4>
                    <p className="font-medium text-sm">${product?.price}</p>

                    <div className="flex items-center text-sm my-4">
                      <p>{product?.rating.rate}</p>
                      {product?.rating.rate && (
                        <div className="flex items-center ml-2 mr-6">
                          {Array.from(
                            { length: Math.floor(product.rating.rate) },
                            (_, i) => (
                              <StarIcon
                                key={i}
                                className="h-4 w-4 text-yellow-500"
                              />
                            )
                          )}

                          {Array.from(
                            { length: 5 - Math.floor(product.rating.rate) },
                            (_, i) => (
                              <StarIconOutline
                                key={i}
                                className="h-4 w-4 text-yellow-500"
                              />
                            )
                          )}
                        </div>
                      )}
                      <p className="text-blue-600 hover:underline cursor-pointer text-xs">
                        See all {product?.rating.count} reviews
                      </p>
                    </div>

                    <p className="line-clamp-5 text-sm">
                      {product?.description}
                    </p>
                  </div>

                  <div className="space-y-3 text-sm">
                    <button className="button w-full bg-yellow-300 text-black border-none hover:border-yellow-400 hover:bg-yellow-400 hover:text-black">
                      Add to bag
                    </button>
                    <Link
                      href={`/product/${id}`}
                      className="button w-full block text-center display-b bg-transparent border-yellow-300 hover:bg-yellow-400 hover:text-black"
                    >
                      View full details
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
}

export default Modal;
