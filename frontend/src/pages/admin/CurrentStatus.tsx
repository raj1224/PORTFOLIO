import { useState } from "react";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  Pencil,
  Plus,
  Trash2,
  X,
} from "lucide-react";

import {
  createStatus,
  deleteStatus,
  getAdminStatuses,
  updateStatus,
} from "../../services/content";

import type { CurrentStatus } from "../../types";

import {
  Button,
  Field,
  input,
} from "../../components/admin/FormUI";

import { apiError } from "../../lib/ui";

const emptyForm: Pick<
  CurrentStatus,
  "title" |
    "description" |
    "type" |
    "status" |
    "order" |
    "isVisible"
> = {
  title: "",
  description: "",
  type: "learning",
  status: "in_progress",
  order: 0,
  isVisible: true,
};

export default function CurrentStatus() {
  const queryClient = useQueryClient();

  const [editing, setEditing] =
    useState<CurrentStatus | null>(null);

  const [isFormOpen, setIsFormOpen] =
    useState(false);

  const [form, setForm] = useState(emptyForm);

  const [error, setError] = useState("");

  // --------------------------------
  // Fetch statuses
  // --------------------------------

  const statusQuery = useQuery({
    queryKey: ["admin-statuses"],
    queryFn: getAdminStatuses,
  });

  // --------------------------------
  // Create / Update
  // --------------------------------

  const saveMutation = useMutation({
    mutationFn: () =>
      editing
        ? updateStatus(editing._id, form)
        : createStatus(form),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-statuses"],
      });

      queryClient.invalidateQueries({
        queryKey: ["statuses"],
      });

      closeForm();
    },

    onError: (error) => {
      setError(apiError(error));
    },
  });

  // --------------------------------
  // Delete
  // --------------------------------

  const deleteMutation = useMutation({
    mutationFn: deleteStatus,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-statuses"],
      });

      queryClient.invalidateQueries({
        queryKey: ["statuses"],
      });
    },

    onError: (error) => {
      setError(apiError(error));
    },
  });

  // --------------------------------
  // Open create form
  // --------------------------------

  function openCreateForm() {
    setEditing(null);

    setForm({
      ...emptyForm,
    });

    setError("");
    setIsFormOpen(true);
  }

  // --------------------------------
  // Open edit form
  // --------------------------------

  function editStatus(status: CurrentStatus) {
    setEditing(status);

    setForm({
      title: status.title,
      description: status.description,
      type: status.type,
      status: status.status,
      order: status.order,
      isVisible: status.isVisible,
    });

    setError("");
    setIsFormOpen(true);
  }

  // --------------------------------
  // Close form
  // --------------------------------

  function closeForm() {
    setIsFormOpen(false);

    setEditing(null);

    setForm({
      ...emptyForm,
    });

    setError("");
  }

  // --------------------------------
  // Save
  // --------------------------------

  function handleSave() {
    setError("");

    if (!form.title.trim()) {
      setError("Title is required.");
      return;
    }

    if (!form.description.trim()) {
      setError("Description is required.");
      return;
    }

    saveMutation.mutate();
  }

  // --------------------------------
  // Delete
  // --------------------------------

  function handleDelete(status: CurrentStatus) {
    const confirmed = window.confirm(
      `Delete ${status.title}?`,
    );

    if (!confirmed) return;

    deleteMutation.mutate(status._id);
  }

  return (
    <div>
      {/* --------------------------------
          Header
      -------------------------------- */}

      <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-black">
            Current Status
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Show what you're learning, working on or
            building.
          </p>
        </div>

        <Button onClick={openCreateForm}>
          <Plus size={15} />
          Add Status
        </Button>
      </div>

      {/* --------------------------------
          Query Error
      -------------------------------- */}

      {statusQuery.isError && (
        <div className="mb-5 rounded-2xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-300">
          {apiError(statusQuery.error)}
        </div>
      )}

      {/* --------------------------------
          Create / Edit Form
      -------------------------------- */}

      {isFormOpen && (
        <div className="mb-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          {/* Form Header */}

          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold">
                {editing
                  ? "Edit Status"
                  : "New Status"}
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                {editing
                  ? "Update your current status."
                  : "Add something you are currently working on."}
              </p>
            </div>

            <button
              type="button"
              onClick={closeForm}
              className="grid h-9 w-9 place-items-center rounded-xl text-slate-400 transition hover:bg-white/10 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          {/* Form Error */}

          {error && (
            <div className="mt-4 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          {/* Form Fields */}

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {/* Title */}

            <Field label="Title">
              <input
                className={input}
                value={form.title}
                placeholder="Building Portfolio"
                onChange={(event) =>
                  setForm({
                    ...form,
                    title: event.target.value,
                  })
                }
              />
            </Field>

            {/* Type */}

            <Field label="Type">
              <select
                className={input}
                value={form.type}
                onChange={(event) =>
                  setForm({
                    ...form,
                    type: event.target
                      .value as typeof form.type,
                  })
                }
              >
                <option value="learning">
                  learning
                </option>

                <option value="working">
                  working
                </option>

                <option value="building">
                  building
                </option>
              </select>
            </Field>

            {/* Status */}

            <Field label="Status">
              <select
                className={input}
                value={form.status}
                onChange={(event) =>
                  setForm({
                    ...form,
                    status: event.target
                      .value as typeof form.status,
                  })
                }
              >
                <option value="planning">
                  planning
                </option>

                <option value="in_progress">
                  in progress
                </option>

                <option value="completed">
                  completed
                </option>

                <option value="paused">
                  paused
                </option>
              </select>
            </Field>

            {/* Order */}

            <Field label="Order">
              <input
                type="number"
                className={input}
                value={form.order}
                onChange={(event) =>
                  setForm({
                    ...form,
                    order: Number(
                      event.target.value,
                    ),
                  })
                }
              />
            </Field>

            {/* Description */}

            <div className="md:col-span-2">
              <Field label="Description">
                <textarea
                  rows={4}
                  className={input}
                  value={form.description}
                  placeholder="Working on a production-ready portfolio..."
                  onChange={(event) =>
                    setForm({
                      ...form,
                      description:
                        event.target.value,
                    })
                  }
                />
              </Field>
            </div>
          </div>

          {/* Visibility */}

          <label className="mt-5 flex cursor-pointer items-center gap-3 text-sm text-slate-300">
            <input
              type="checkbox"
              checked={form.isVisible}
              onChange={(event) =>
                setForm({
                  ...form,
                  isVisible:
                    event.target.checked,
                })
              }
              className="h-4 w-4"
            />

            <span>Visible publicly</span>
          </label>

          {/* Actions */}

          <div className="mt-6 flex gap-2">
            <Button
              onClick={handleSave}
              disabled={saveMutation.isPending}
            >
              {saveMutation.isPending
                ? "Saving..."
                : editing
                  ? "Update Status"
                  : "Save Status"}
            </Button>

            <Button
              variant="ghost"
              onClick={closeForm}
              disabled={saveMutation.isPending}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* --------------------------------
          Status List
      -------------------------------- */}

      <div className="grid gap-4 lg:grid-cols-2">
        {statusQuery.isLoading ? (
          <div className="rounded-3xl border border-white/10 p-8 text-center text-sm text-slate-500 lg:col-span-2">
            Loading statuses...
          </div>
        ) : !statusQuery.data?.length ? (
          <div className="rounded-3xl border border-white/10 p-8 text-center lg:col-span-2">
            <div className="text-sm font-semibold text-slate-300">
              No current statuses found
            </div>

            <p className="mt-1 text-xs text-slate-500">
              Add your first status using the button
              above.
            </p>
          </div>
        ) : (
          statusQuery.data.map((status) => (
            <div
              key={status._id}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-6"
            >
              {/* Top */}

              <div className="flex justify-between gap-4">
                <div>
                  <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs text-violet-300">
                    {status.type}
                  </span>

                  <h3 className="mt-4 text-xl font-bold">
                    {status.title}
                  </h3>
                </div>

                <span
                  className={`text-xs ${
                    status.status ===
                    "completed"
                      ? "text-emerald-300"
                      : status.status ===
                          "paused"
                        ? "text-amber-300"
                        : "text-slate-500"
                  }`}
                >
                  {status.status}
                </span>
              </div>

              {/* Description */}

              <p className="mt-3 text-sm leading-6 text-slate-400">
                {status.description}
              </p>

              {/* Meta */}

              <div className="mt-4 text-xs text-slate-500">
                Order: {status.order}
                {" · "}
                {status.isVisible
                  ? "Visible"
                  : "Hidden"}
              </div>

              {/* Actions */}

              <div className="mt-5 flex gap-2">
                <Button
                  variant="ghost"
                  onClick={() =>
                    editStatus(status)
                  }
                >
                  <Pencil size={15} />
                  Edit
                </Button>

                <Button
                  variant="danger"
                  onClick={() =>
                    handleDelete(status)
                  }
                  disabled={
                    deleteMutation.isPending
                  }
                >
                  <Trash2 size={15} />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}