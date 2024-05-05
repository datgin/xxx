<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "name" => "required|string|unique:products",
            "price" => "required|numeric",
        ];
    }

    public function messages()
    {
        return [
            "name.required" => "Vui lòng nhập tên sản phẩm",
            "name.string" => "Tên sản phẩm phải là chuỗi",
            "price.required" => "Vui lòng nhập đơn giá sản phẩm",
            "price.numeric" => "Đơngiá sản phẩm phải là số",
        ];
    }

    public function attributes()
    {
        return [
            "name" => "Tên sản phẩm",
        ];
    }
}
