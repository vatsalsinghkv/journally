"use server";

import { revalidatePath } from "next/cache";
import type { Entry } from "@/generated/prisma/client";
import prisma from "@/lib/services/prisma";
import { getServerUser } from "@/lib/services/auth";

export type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };

export async function getEntries(): Promise<ActionResult<Entry[]>> {
  try {
    const user = await getServerUser();

    if (!user) {
      throw new Error("Unauthorized");
    }

    const entries = await prisma.entry.findMany({
      where: { userId: user.id },
      orderBy: { date: "desc" },
    });

    return { success: true, data: entries };
  } catch (err) {
    console.error(err);
    return { success: false, error: "Failed to load entries" };
  }
}

export async function getEntry(id: string): Promise<ActionResult<Entry>> {
  try {
    const user = await getServerUser();

    if (!user) {
      throw new Error("Unauthorized");
    }

    const entry = await prisma.entry.findFirst({
      where: { id, userId: user.id },
    });

    if (!entry) {
      return { success: false, error: "Entry not found" };
    }

    return { success: true, data: entry };
  } catch (err) {
    console.error(err);
    return { success: false, error: "Failed to load entry" };
  }
}

export async function createEntry(
  data: Pick<Entry, "title" | "content" | "date" | "coverImage">,
): Promise<ActionResult<Entry>> {
  try {
    console.log("createEntry data:", data);
    const user = await getServerUser();

    if (!user) {
      throw new Error("Unauthorized");
    }
    console.log({ user });

    const entry = await prisma.entry.create({
      data: {
        ...data,
        userId: user.id,
      },
    });

    revalidatePath("/entries");
    revalidatePath("/dashboard");

    return { success: true, data: entry };
  } catch (err) {
    console.error({ err });
    return { success: false, error: "Failed to create entry" };
  }
}

export async function updateEntry(
  data: Partial<Entry>,
): Promise<ActionResult<Entry>> {
  try {
    const user = await getServerUser();
    console.log({ "updateEntry data": data });
    if (!user) {
      throw new Error("Unauthorized");
    }

    const { id } = data;

    const entry = await prisma.entry.updateMany({
      where: { id, userId: user.id },
      data,
    });

    if (!entry.count) {
      return { success: false, error: "Entry not found" };
    }

    const updated = await prisma.entry.findUnique({ where: { id } });

    revalidatePath("/entries");

    return { success: true, data: updated as Entry };
  } catch (err) {
    console.error(err);
    return { success: false, error: "Failed to update entry" };
  }
}

export async function deleteEntry(id: string): Promise<ActionResult<null>> {
  try {
    const user = await getServerUser();

    if (!user) {
      throw new Error("Unauthorized");
    }

    await prisma.entry.deleteMany({
      where: { id, userId: user.id },
    });

    revalidatePath("/entries");

    return { success: true, data: null };
  } catch (err) {
    console.error(err);
    return { success: false, error: "Failed to delete entry" };
  }
}

export async function toggleFavorite(id: string): Promise<ActionResult<Entry>> {
  try {
    const user = await getServerUser();

    if (!user) {
      throw new Error("Unauthorized");
    }

    const entry = await prisma.entry.findFirst({
      where: { id, userId: user.id },
    });

    if (!entry) {
      return { success: false, error: "Entry not found" };
    }

    const updated = await prisma.entry.update({
      where: { id },
      data: { isFavorite: !entry.isFavorite },
    });

    revalidatePath("/entries");
    revalidatePath("/entries/favourites");

    return { success: true, data: updated };
  } catch (err) {
    console.error(err);
    return { success: false, error: "Failed to toggle favorite" };
  }
}
