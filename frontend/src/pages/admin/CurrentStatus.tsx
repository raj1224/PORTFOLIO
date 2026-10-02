import { useMemo, useState } from "react";

import {
  Activity,
  AlertCircle,
  Check,
  CheckCircle2,
  CircleDot,
  Eye,
  EyeOff,
  Layers3,
  Loader2,
  Pencil,
  Plus,
  Trash2,
  X,
} from "lucide-react";

import {
  useAdminCurrentStatuses,
  useCreateCurrentStatus,
  useUpdateCurrentStatus,
  useDeleteCurrentStatus,
} from "../../hooks/useCurrent-status";

import type {
  CurrentStatus,
  CurrentStatusState,
  CurrentStatusType,
} from "../../services/current-status.service";

interface StatusForm {
  title: string;
  description: string;
  type: CurrentStatusType;
  status: CurrentStatusState;
  order: number;
  isVisible: boolean;
}

const initialForm: StatusForm = {
  title: "",
  description: "",
  type: "working",
  status: "in_progress",
  order: 0,
  isVisible: true,
};

const typeLabels: Record<
  CurrentStatusType,
  string
> = {
  learning: "Learning",
  working: "Working",
  building: "Building",
};

const statusLabels: Record<
  CurrentStatusState,
  string
> = {
  planning: "Planning",
  in_progress: "In Progress",
  completed: "Completed",
  paused: "Paused",
};

const typeStyles: Record<
  CurrentStatusType,
  string
> = {
  learning:
    "border-blue-500/20 bg-blue-500/10 text-blue-400",

  working:
    "border-purple-500/20 bg-purple-500/10 text-purple-400",

  building:
    "border-cyan-500/20 bg-cyan-500/10 text-cyan-400",
};

const statusStyles: Record<
  CurrentStatusState,
  string
> = {
  planning:
    "border-yellow-500/20 bg-yellow-500/10 text-yellow-400",

  in_progress:
    "border-blue-500/20 bg-blue-500/10 text-blue-400",

  completed:
    "border-green-500/20 bg-green-500/10 text-green-400",

  paused:
    "border-red-500/20 bg-red-500/10 text-red-400",
};

const getStatusIcon = (
  status: CurrentStatusState
) => {
  switch (status) {
    case "completed":
      return (
        <CheckCircle2 className="h-3.5 w-3.5" />
      );

    case "in_progress":
      return (
        <Activity className="h-3.5 w-3.5" />
      );

    case "planning":
      return (
        <CircleDot className="h-3.5 w-3.5" />
      );

    case "paused":
      return (
        <AlertCircle className="h-3.5 w-3.5" />
      );
  }
};

const CurrentStatusPage = () => {
  const {
    data: statuses = [],
    isLoading,
    isError,
    refetch,
  } = useAdminCurrentStatuses();

  const createMutation =
    useCreateCurrentStatus();

  const updateMutation =
    useUpdateCurrentStatus();

  const deleteMutation =
    useDeleteCurrentStatus();

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [editingStatus, setEditingStatus] =
    useState<CurrentStatus | null>(null);

  const [deleteTarget, setDeleteTarget] =
    useState<CurrentStatus | null>(null);

  const [form, setForm] =
    useState<StatusForm>(initialForm);

  const [formError, setFormError] =
    useState("");

  // ==============================
  // STATS
  // ==============================

  const stats = useMemo(() => {
    return {
      total: statuses.length,

      visible: statuses.filter(
        (status) => status.isVisible
      ).length,

      inProgress: statuses.filter(
        (status) =>
          status.status === "in_progress"
      ).length,

      completed: statuses.filter(
        (status) =>
          status.status === "completed"
      ).length,
    };
  }, [statuses]);

  // ==============================
  // OPEN CREATE MODAL
  // ==============================

  const openCreateModal = () => {
    setEditingStatus(null);
    setForm(initialForm);
    setFormError("");
    setIsModalOpen(true);
  };

  // ==============================
  // OPEN EDIT MODAL
  // ==============================

  const openEditModal = (
    status: CurrentStatus
  ) => {
    setEditingStatus(status);

    setForm({
      title: status.title,
      description: status.description,
      type: status.type,
      status: status.status,
      order: status.order,
      isVisible: status.isVisible,
    });

    setFormError("");
    setIsModalOpen(true);
  };

  // ==============================
  // CLOSE MODAL
  // ==============================

  const closeModal = () => {
    if (
      createMutation.isPending ||
      updateMutation.isPending
    ) {
      return;
    }

    setIsModalOpen(false);
    setEditingStatus(null);
    setForm(initialForm);
    setFormError("");
  };

  // ==============================
  // FORM CHANGE
  // ==============================

  const updateForm = <
    K extends keyof StatusForm
  >(
    key: K,
    value: StatusForm[K]
  ) => {
    setForm((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  // ==============================
  // CREATE / UPDATE
  // ==============================

  const handleSubmit = async (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    setFormError("");

    if (!form.title.trim()) {
      setFormError(
        "Title is required."
      );
      return;
    }

    if (!form.description.trim()) {
      setFormError(
        "Description is required."
      );
      return;
    }

    try {
      if (editingStatus) {
        await updateMutation.mutateAsync({
          statusId: editingStatus._id,

          data: {
            title: form.title.trim(),
            description:
              form.description.trim(),
            type: form.type,
            status: form.status,
            order: form.order,
            isVisible: form.isVisible,
          },
        });
      } else {
        await createMutation.mutateAsync({
          title: form.title.trim(),
          description:
            form.description.trim(),
          type: form.type,
          status: form.status,
          order: form.order,
          isVisible: form.isVisible,
        });
      }

      closeModal();
    } catch (error) {
      console.error(
        editingStatus
          ? "Failed to update current status:"
          : "Failed to create current status:",
        error
      );

      setFormError(
        editingStatus
          ? "Failed to update status. Please try again."
          : "Failed to create status. Please try again."
      );
    }
  };

  // ==============================
  // DELETE
  // ==============================

  const handleDelete = async () => {
    if (!deleteTarget) {
      return;
    }

    try {
      await deleteMutation.mutateAsync(
        deleteTarget._id
      );

      setDeleteTarget(null);
    } catch (error) {
      console.error(
        "Failed to delete current status:",
        error
      );
    }
  };

  // ==============================
  // VISIBILITY TOGGLE
  // ==============================

  const handleVisibilityToggle = async (
    status: CurrentStatus
  ) => {
    try {
      await updateMutation.mutateAsync({
        statusId: status._id,

        data: {
          isVisible: !status.isVisible,
        },
      });
    } catch (error) {
      console.error(
        "Failed to update visibility:",
        error
      );
    }
  };

  const isSaving =
    createMutation.isPending ||
    updateMutation.isPending;

  // ==============================
  // LOADING
  // ==============================

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex items-center gap-3 text-zinc-400">
          <Loader2 className="h-5 w-5 animate-spin" />

          <span>
            Loading current statuses...
          </span>
        </div>
      </div>
    );
  }

  // ==============================
  // ERROR
  // ==============================

  if (isError) {
    return (
      <div className="mx-auto max-w-7xl">
        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-8 text-center">
          <AlertCircle className="mx-auto mb-4 h-10 w-10 text-red-400" />

          <h2 className="text-lg font-semibold text-white">
            Failed to load current statuses
          </h2>

          <p className="mt-2 text-sm text-zinc-400">
            Something went wrong while fetching
            your current status data.
          </p>

          <button
            type="button"
            onClick={() => refetch()}
            className="mt-5 rounded-xl bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-zinc-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* ==========================
          HEADER
      ========================== */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="mb-2 text-sm font-medium text-purple-400">
            Portfolio CMS
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-white">
            Current Status
          </h1>

          <p className="mt-2 text-sm text-zinc-400">
            Manage what you're currently
            learning, working on, and building.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/10 transition hover:opacity-90"
        >
          <Plus className="h-4 w-4" />

          Add Status
        </button>
      </div>

      {/* ==========================
          STATS
      ========================== */}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Status"
          value={stats.total}
          icon={
            <Layers3 className="h-5 w-5" />
          }
          iconClass="bg-purple-500/10 text-purple-400"
        />

        <StatCard
          label="Visible"
          value={stats.visible}
          icon={
            <Eye className="h-5 w-5" />
          }
          iconClass="bg-blue-500/10 text-blue-400"
        />

        <StatCard
          label="In Progress"
          value={stats.inProgress}
          icon={
            <Activity className="h-5 w-5" />
          }
          iconClass="bg-cyan-500/10 text-cyan-400"
        />

        <StatCard
          label="Completed"
          value={stats.completed}
          icon={
            <CheckCircle2 className="h-5 w-5" />
          }
          iconClass="bg-green-500/10 text-green-400"
        />
      </div>

      {/* ==========================
          STATUS LIST
      ========================== */}

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/70">
        <div className="border-b border-white/10 px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-white">
                All Current Status
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                Manage visibility, progress and
                ordering.
              </p>
            </div>

            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-400">
              {statuses.length}{" "}
              {statuses.length === 1
                ? "item"
                : "items"}
            </span>
          </div>
        </div>

        {statuses.length === 0 ? (
          <EmptyState
            onAdd={openCreateModal}
          />
        ) : (
          <div className="divide-y divide-white/10">
            {statuses.map((status) => (
              <StatusRow
                key={status._id}
                status={status}
                isUpdating={
                  updateMutation.isPending
                }
                onEdit={openEditModal}
                onDelete={setDeleteTarget}
                onToggleVisibility={
                  handleVisibilityToggle
                }
              />
            ))}
          </div>
        )}
      </div>

      {/* ==========================
          CREATE / EDIT MODAL
      ========================== */}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-2xl">
            {/* Modal header */}

            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  {editingStatus
                    ? "Edit Current Status"
                    : "Add Current Status"}
                </h2>

                <p className="mt-1 text-sm text-zinc-500">
                  {editingStatus
                    ? "Update your current activity."
                    : "Add something you're currently doing."}
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={isSaving}
                className="rounded-lg p-2 text-zinc-400 transition hover:bg-white/5 hover:text-white disabled:opacity-50"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form */}

            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-6"
            >
              {/* Error */}

              {formError && (
                <div className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                  <AlertCircle className="h-4 w-4 shrink-0" />

                  {formError}
                </div>
              )}

              {/* Title */}

              <FormField label="Title">
                <input
                  type="text"
                  value={form.title}
                  onChange={(event) =>
                    updateForm(
                      "title",
                      event.target.value
                    )
                  }
                  placeholder="e.g. Building GymOS"
                  maxLength={100}
                  className={inputClass}
                />
              </FormField>

              {/* Description */}

              <FormField label="Description">
                <textarea
                  value={form.description}
                  onChange={(event) =>
                    updateForm(
                      "description",
                      event.target.value
                    )
                  }
                  placeholder="Describe what you're currently doing..."
                  maxLength={500}
                  rows={4}
                  className={`${inputClass} resize-none`}
                />
              </FormField>

              {/* Type + Status */}

              <div className="grid gap-5 sm:grid-cols-2">
                <FormField label="Type">
                  <select
                    value={form.type}
                    onChange={(event) =>
                      updateForm(
                        "type",
                        event.target
                          .value as CurrentStatusType
                      )
                    }
                    className={inputClass}
                  >
                    <option value="learning">
                      Learning
                    </option>

                    <option value="working">
                      Working
                    </option>

                    <option value="building">
                      Building
                    </option>
                  </select>
                </FormField>

                <FormField label="Status">
                  <select
                    value={form.status}
                    onChange={(event) =>
                      updateForm(
                        "status",
                        event.target
                          .value as CurrentStatusState
                      )
                    }
                    className={inputClass}
                  >
                    <option value="planning">
                      Planning
                    </option>

                    <option value="in_progress">
                      In Progress
                    </option>

                    <option value="completed">
                      Completed
                    </option>

                    <option value="paused">
                      Paused
                    </option>
                  </select>
                </FormField>
              </div>

              {/* Order */}

              <FormField label="Display Order">
                <input
                  type="number"
                  min={0}
                  value={form.order}
                  onChange={(event) =>
                    updateForm(
                      "order",
                      Number(event.target.value)
                    )
                  }
                  className={inputClass}
                />
              </FormField>

              {/* Visibility */}

              <label className="flex cursor-pointer items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4">
                <div>
                  <p className="text-sm font-medium text-white">
                    Show on portfolio
                  </p>

                  <p className="mt-1 text-xs text-zinc-500">
                    Visible statuses appear on
                    your public portfolio.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    updateForm(
                      "isVisible",
                      !form.isVisible
                    )
                  }
                  className={`relative h-6 w-11 rounded-full transition ${
                    form.isVisible
                      ? "bg-purple-500"
                      : "bg-zinc-700"
                  }`}
                >
                  <span
                    className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                      form.isVisible
                        ? "left-6"
                        : "left-1"
                    }`}
                  />
                </button>
              </label>

              {/* Actions */}

              <div className="flex justify-end gap-3 border-t border-white/10 pt-5">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={isSaving}
                  className="rounded-xl border border-white/10 px-5 py-2.5 text-sm font-medium text-zinc-300 transition hover:bg-white/5 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSaving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Check className="h-4 w-4" />
                  )}

                  {editingStatus
                    ? "Update Status"
                    : "Create Status"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==========================
          DELETE MODAL
      ========================== */}

      {deleteTarget && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-zinc-950 p-6 shadow-2xl">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
              <Trash2 className="h-6 w-6" />
            </div>

            <h2 className="text-lg font-semibold text-white">
              Delete current status?
            </h2>

            <p className="mt-2 text-sm leading-6 text-zinc-400">
              You're about to delete{" "}
              <span className="font-medium text-white">
                "{deleteTarget.title}"
              </span>
              . This action cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() =>
                  setDeleteTarget(null)
                }
                disabled={
                  deleteMutation.isPending
                }
                className="rounded-xl border border-white/10 px-4 py-2.5 text-sm font-medium text-zinc-300 transition hover:bg-white/5 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={
                  deleteMutation.isPending
                }
                onClick={handleDelete}
                className="inline-flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {deleteMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}

                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrentStatusPage;

// ======================================================
// STAT CARD
// ======================================================

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  iconClass: string;
}

const StatCard = ({
  label,
  value,
  icon,
  iconClass,
}: StatCardProps) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-950/70 p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-zinc-500">
            {label}
          </p>

          <p className="mt-2 text-3xl font-bold text-white">
            {value}
          </p>
        </div>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconClass}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

// ======================================================
// STATUS ROW
// ======================================================

interface StatusRowProps {
  status: CurrentStatus;
  isUpdating: boolean;
  onEdit: (
    status: CurrentStatus
  ) => void;
  onDelete: (
    status: CurrentStatus
  ) => void;
  onToggleVisibility: (
    status: CurrentStatus
  ) => void;
}

const StatusRow = ({
  status,
  isUpdating,
  onEdit,
  onDelete,
  onToggleVisibility,
}: StatusRowProps) => {
  return (
    <div className="group px-6 py-5 transition hover:bg-white/[0.02]">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        {/* Left */}

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-semibold text-white">
              {status.title}
            </h3>

            <span
              className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${typeStyles[status.type]}`}
            >
              {typeLabels[status.type]}
            </span>

            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${statusStyles[status.status]}`}
            >
              {getStatusIcon(
                status.status
              )}

              {statusLabels[
                status.status
              ]}
            </span>
          </div>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-500">
            {status.description}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-zinc-600">
            <span>
              Order:{" "}
              <span className="text-zinc-400">
                {status.order}
              </span>
            </span>

            <span>
              Created:{" "}
              <span className="text-zinc-400">
                {new Date(
                  status.createdAt
                ).toLocaleDateString()}
              </span>
            </span>
          </div>
        </div>

        {/* Right */}

        <div className="flex items-center gap-2">
          {/* Visibility */}

          <button
            type="button"
            onClick={() =>
              onToggleVisibility(status)
            }
            disabled={isUpdating}
            title={
              status.isVisible
                ? "Hide from portfolio"
                : "Show on portfolio"
            }
            className={`inline-flex h-9 items-center gap-2 rounded-lg border px-3 text-xs font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${
              status.isVisible
                ? "border-green-500/20 bg-green-500/10 text-green-400 hover:bg-green-500/20"
                : "border-white/10 bg-white/5 text-zinc-500 hover:bg-white/10"
            }`}
          >
            {isUpdating ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : status.isVisible ? (
              <Eye className="h-3.5 w-3.5" />
            ) : (
              <EyeOff className="h-3.5 w-3.5" />
            )}

            {status.isVisible
              ? "Visible"
              : "Hidden"}
          </button>

          {/* Edit */}

          <button
            type="button"
            onClick={() =>
              onEdit(status)
            }
            className="inline-flex h-9 items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 text-xs font-medium text-zinc-300 transition hover:bg-white/10 hover:text-white"
          >
            <Pencil className="h-3.5 w-3.5" />

            Edit
          </button>

          {/* Delete */}

          <button
            type="button"
            onClick={() =>
              onDelete(status)
            }
            className="inline-flex h-9 items-center gap-2 rounded-lg border border-red-500/10 bg-red-500/5 px-3 text-xs font-medium text-red-400 transition hover:bg-red-500/10"
          >
            <Trash2 className="h-3.5 w-3.5" />

            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

// ======================================================
// EMPTY STATE
// ======================================================

interface EmptyStateProps {
  onAdd: () => void;
}

const EmptyState = ({
  onAdd,
}: EmptyStateProps) => {
  return (
    <div className="px-6 py-20 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-400">
        <Layers3 className="h-7 w-7" />
      </div>

      <h3 className="mt-5 text-lg font-semibold text-white">
        No current statuses
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-500">
        Add your current learning, working or
        building activity so visitors can see
        what you're working on.
      </p>

      <button
        type="button"
        onClick={onAdd}
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
      >
        <Plus className="h-4 w-4" />

        Add First Status
      </button>
    </div>
  );
};

// ======================================================
// FORM FIELD
// ======================================================

interface FormFieldProps {
  label: string;
  children: React.ReactNode;
}

const FormField = ({
  label,
  children,
}: FormFieldProps) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-zinc-300">
        {label}
      </label>

      {children}
    </div>
  );
};

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-purple-500/50 focus:bg-white/[0.05]";