<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Products;
use App\Http\Requests\ProductRequest;
use App\Http\Requests\ProductUpdateRequest;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Products::query()->lazyByIdDesc();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductRequest $request)
    {
        $validatedData = $request->validated();

        $product = Products::create($validatedData);

        return response()->json(['message' => 'Thêm mới thành công', 'product' => $product], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Products::findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProductUpdateRequest $request, string $id)
    {
        $validatedData = $request->validated();

        $product = Products::findOrFail($id);

        $product->update($validatedData);

        return response()->json(['message' => 'Cập nhật thành công', 'product' => $product], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $product = Products::findOrFail($id);

        $product->delete();

        return response()->json(['message' => 'Xóa thành công', 'product' => $product], 200);
    }
}
