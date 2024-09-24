import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const url = new URL(request.url);

    const page = parseInt(url.searchParams.get("page") ?? "1");
    const limit = parseInt(url.searchParams.get("limit") ?? "10");
    const query = url.searchParams.get("query") ?? "";
    // Calculate the offset (skip)

    const skip = (page - 1) * limit;

    // Query to the database with pagination and filtering by title
    const items = await db.poster.findMany({
        where: {
            description: {
                contains: query, // Case-insensitive query
                mode: "insensitive"
            },
            publish: true
        },
        skip,
        take: limit,
        orderBy: {
            created_at: "desc" // Optional: Order by title (or any other field)
        }
    });

    // Get total count of items matching the query for pagination info
    const totalItems = await db.poster.count({
        where: {
            description: {
                contains: query,
                mode: "insensitive"
            }
        }
    });

    // Calculate total pages
    const totalPages = Math.ceil(totalItems / limit);

    // Determine if there are next or previous pages
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    // Calculate next and previous pages
    const nextPage = hasNextPage ? page + 1 : null;
    const prevPage = hasPrevPage ? page - 1 : null;

    return NextResponse.json({
        data: items,
        metadata: {
            page,
            limit,
            totalItems,
            totalPages,
            nextPage,
            prevPage
        }
    });
}
