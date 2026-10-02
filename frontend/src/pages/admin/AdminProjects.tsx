import { useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Upload,
  Image as ImageIcon,
  Star,
  ExternalLink,

} from "lucide-react";

import {
  useAdminProjects,
  useCreateProject,
  useUpdateProject,
  useDeleteProject,
  useUploadProjectImages,
  useUploadProjectThumbnail,
  useDeleteProjectImage,
} from "../../hooks/useProjects";

const Projects = () => {
  const {
    data: projects = [],
    isLoading,
    isError,
  } = useAdminProjects();

  const createProject = useCreateProject();
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();

  const uploadImages = useUploadProjectImages();
  const uploadThumbnail = useUploadProjectThumbnail();
  const deleteImage = useDeleteProjectImage();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    shortDescription: "",
    techStack: "",
    githubUrl: "",
    liveUrl: "",
    status: "draft" as
      | "draft"
      | "published"
      | "archived",
    featured: false,
    order: 0,
  });

  const resetForm = () => {
    setForm({
      title: "",
      slug: "",
      description: "",
      shortDescription: "",
      techStack: "",
      githubUrl: "",
      liveUrl: "",
      status: "draft",
      featured: false,
      order: 0,
    });

    setEditingId(null);
    setIsFormOpen(false);
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const payload = {
      title: form.title,
      slug: form.slug,
      description: form.description,
      shortDescription:
        form.shortDescription || undefined,

      techStack: form.techStack
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),

      githubUrl: form.githubUrl || undefined,
      liveUrl: form.liveUrl || undefined,
      status: form.status,
      featured: form.featured,
      order: Number(form.order),
    };

    try {
      if (editingId) {
        await updateProject.mutateAsync({
          projectId: editingId,
          data: payload,
        });
      } else {
        await createProject.mutateAsync(payload);
      }

      resetForm();
    } catch (error: any) {
      alert(
        error?.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  const handleEdit = (project: any) => {
    setEditingId(project._id);

    setForm({
      title: project.title,
      slug: project.slug,
      description: project.description,
      shortDescription:
        project.shortDescription || "",
      techStack: project.techStack.join(", "),
      githubUrl: project.githubUrl || "",
      liveUrl: project.liveUrl || "",
      status: project.status,
      featured: project.featured,
      order: project.order,
    });

    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmed) return;

    try {
      await deleteProject.mutateAsync(id);
    } catch (error: any) {
      alert(
        error?.response?.data?.message ||
          "Failed to delete project"
      );
    }
  };

  const handleThumbnailUpload = async (
    projectId: string,
    file?: File
  ) => {
    if (!file) return;

    try {
      await uploadThumbnail.mutateAsync({
        projectId,
        file,
      });
    } catch (error: any) {
      alert(
        error?.response?.data?.message ||
          "Failed to upload thumbnail"
      );
    }
  };

  const handleImagesUpload = async (
    projectId: string,
    files: FileList | null
  ) => {
    if (!files || files.length === 0) return;

    try {
      await uploadImages.mutateAsync({
        projectId,
        files: Array.from(files),
      });
    } catch (error: any) {
      alert(
        error?.response?.data?.message ||
          "Failed to upload images"
      );
    }
  };

  const handleImageDelete = async (
    projectId: string,
    publicId: string
  ) => {
    const confirmed = window.confirm(
      "Delete this image?"
    );

    if (!confirmed) return;

    try {
      await deleteImage.mutateAsync({
        projectId,
        publicId,
      });
    } catch (error: any) {
      alert(
        error?.response?.data?.message ||
          "Failed to delete image"
      );
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center text-slate-400">
        Loading projects...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6 text-red-400">
        Failed to load projects.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-indigo-400">
            Portfolio CMS
          </p>

          <h1 className="mt-1 text-3xl font-bold text-white">
            Projects
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Create and manage the projects displayed on
            your portfolio.
          </p>
        </div>

        <button
          onClick={() => {
            resetForm();
            setIsFormOpen(true);
          }}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
        >
          <Plus size={18} />
          Add Project
        </button>
      </div>

      {/* Create / Edit */}

      {isFormOpen && (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d111c] shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
            <div>
              <h2 className="text-lg font-semibold text-white">
                {editingId
                  ? "Edit Project"
                  : "Create Project"}
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Fill in the project information below.
              </p>
            </div>

            <button
              type="button"
              onClick={resetForm}
              className="rounded-lg p-2 text-slate-400 transition hover:bg-white/5 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid gap-5 p-6 md:grid-cols-2"
          >
            {/* Title */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Project Title
              </label>

              <input
                required
                value={form.title}
                onChange={(e) =>
                  setForm({
                    ...form,
                    title: e.target.value,
                  })
                }
                placeholder="QuickAI"
                className="w-full rounded-xl border border-white/10 bg-[#070a12] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500"
              />
            </div>

            {/* Slug */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Slug
              </label>

              <input
                required
                value={form.slug}
                onChange={(e) =>
                  setForm({
                    ...form,
                    slug: e.target.value
                      .toLowerCase()
                      .replace(/\s+/g, "-"),
                  })
                }
                placeholder="quickai"
                className="w-full rounded-xl border border-white/10 bg-[#070a12] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500"
              />
            </div>

            {/* Short Description */}

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Short Description
              </label>

              <input
                value={form.shortDescription}
                onChange={(e) =>
                  setForm({
                    ...form,
                    shortDescription: e.target.value,
                  })
                }
                placeholder="AI-powered productivity platform"
                className="w-full rounded-xl border border-white/10 bg-[#070a12] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500"
              />
            </div>

            {/* Description */}

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Description
              </label>

              <textarea
                required
                rows={5}
                value={form.description}
                onChange={(e) =>
                  setForm({
                    ...form,
                    description: e.target.value,
                  })
                }
                placeholder="Describe what you built..."
                className="w-full resize-none rounded-xl border border-white/10 bg-[#070a12] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500"
              />
            </div>

            {/* Tech Stack */}

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Tech Stack
              </label>

              <input
                required
                value={form.techStack}
                onChange={(e) =>
                  setForm({
                    ...form,
                    techStack: e.target.value,
                  })
                }
                placeholder="React, Node.js, MongoDB, TypeScript"
                className="w-full rounded-xl border border-white/10 bg-[#070a12] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500"
              />

              <p className="mt-2 text-xs text-slate-500">
                Separate technologies using commas.
              </p>
            </div>

            {/* GitHub */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                GitHub URL
              </label>

              <input
                type="url"
                value={form.githubUrl}
                onChange={(e) =>
                  setForm({
                    ...form,
                    githubUrl: e.target.value,
                  })
                }
                placeholder="https://github.com/..."
                className="w-full rounded-xl border border-white/10 bg-[#070a12] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500"
              />
            </div>

            {/* Live */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Live URL
              </label>

              <input
                type="url"
                value={form.liveUrl}
                onChange={(e) =>
                  setForm({
                    ...form,
                    liveUrl: e.target.value,
                  })
                }
                placeholder="https://..."
                className="w-full rounded-xl border border-white/10 bg-[#070a12] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500"
              />
            </div>

            {/* Status */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Status
              </label>

              <select
                value={form.status}
                onChange={(e) =>
                  setForm({
                    ...form,
                    status: e.target.value as
                      | "draft"
                      | "published"
                      | "archived",
                  })
                }
                className="w-full rounded-xl border border-white/10 bg-[#070a12] px-4 py-3 text-sm text-white outline-none focus:border-indigo-500"
              >
                <option value="draft">Draft</option>
                <option value="published">
                  Published
                </option>
                <option value="archived">
                  Archived
                </option>
              </select>
            </div>

            {/* Order */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Display Order
              </label>

              <input
                type="number"
                min="0"
                value={form.order}
                onChange={(e) =>
                  setForm({
                    ...form,
                    order: Number(e.target.value),
                  })
                }
                className="w-full rounded-xl border border-white/10 bg-[#070a12] px-4 py-3 text-sm text-white outline-none focus:border-indigo-500"
              />
            </div>

            {/* Featured */}

            <label className="flex cursor-pointer items-center gap-3 md:col-span-2">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) =>
                  setForm({
                    ...form,
                    featured: e.target.checked,
                  })
                }
                className="h-4 w-4 accent-indigo-500"
              />

              <div>
                <p className="text-sm font-medium text-slate-200">
                  Featured Project
                </p>

                <p className="text-xs text-slate-500">
                  Show this project in the featured section.
                </p>
              </div>
            </label>

            {/* Buttons */}

            <div className="flex gap-3 md:col-span-2">
              <button
                type="submit"
                disabled={
                  createProject.isPending ||
                  updateProject.isPending
                }
                className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {createProject.isPending ||
                updateProject.isPending
                  ? "Saving..."
                  : editingId
                  ? "Update Project"
                  : "Create Project"}
              </button>

              <button
                type="button"
                onClick={resetForm}
                className="rounded-xl border border-white/10 px-6 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Projects */}

      <div className="space-y-5">
        {projects.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 bg-[#0d111c] p-12 text-center">
            <ImageIcon
              className="mx-auto mb-4 text-slate-600"
              size={40}
            />

            <h3 className="font-semibold text-slate-300">
              No projects yet
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Create your first project to display it
              here.
            </p>
          </div>
        ) : (
          projects.map((project: any) => (
            <div
              key={project._id}
              className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d111c]"
            >
              {/* Project Header */}

              <div className="flex flex-col gap-5 border-b border-white/10 p-5 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex min-w-0 gap-4">
                  {/* Thumbnail */}

                  {project.thumbnail?.url ? (
                    <img
                      src={project.thumbnail.url}
                      alt={project.title}
                      className="h-24 w-36 shrink-0 rounded-xl border border-white/10 object-cover"
                    />
                  ) : (
                    <div className="flex h-24 w-36 shrink-0 items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/[0.02]">
                      <ImageIcon
                        size={24}
                        className="text-slate-600"
                      />
                    </div>
                  )}

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-lg font-semibold text-white">
                        {project.title}
                      </h2>

                      <span className="rounded-full bg-white/5 px-3 py-1 text-xs capitalize text-slate-400">
                        {project.status}
                      </span>

                      {project.featured && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-3 py-1 text-xs text-amber-400">
                          <Star size={12} />
                          Featured
                        </span>
                      )}
                    </div>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                      {project.shortDescription ||
                        project.description}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.techStack.map(
                        (tech: string) => (
                          <span
                            key={tech}
                            className="rounded-lg bg-white/5 px-2.5 py-1 text-xs text-slate-300"
                          >
                            {tech}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}

                <div className="flex shrink-0 gap-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-xl border border-white/10 p-3 text-slate-400 transition hover:bg-white/5 hover:text-white"
                    >
                      GH
                    </a>
                  )}

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-xl border border-white/10 p-3 text-slate-400 transition hover:bg-white/5 hover:text-white"
                    >
                      <ExternalLink size={17} />
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={() =>
                      handleEdit(project)
                    }
                    className="rounded-xl border border-white/10 p-3 text-slate-300 transition hover:bg-white/5"
                  >
                    <Pencil size={17} />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleDelete(project._id)
                    }
                    disabled={deleteProject.isPending}
                    className="rounded-xl border border-red-500/20 p-3 text-red-400 transition hover:bg-red-500/10"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </div>

              {/* Media Management */}

              <div className="grid gap-6 p-5 lg:grid-cols-2">
                {/* Thumbnail */}

                <div className="rounded-2xl border border-white/10 bg-[#070a12] p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-white">
                        Thumbnail
                      </h3>

                      <p className="mt-1 text-xs text-slate-500">
                        Main image for the project card.
                      </p>
                    </div>

                    <ImageIcon
                      size={18}
                      className="text-slate-500"
                    />
                  </div>

                  {project.thumbnail?.url ? (
                    <img
                      src={project.thumbnail.url}
                      alt={`${project.title} thumbnail`}
                      className="mb-4 h-44 w-full rounded-xl object-cover"
                    />
                  ) : (
                    <div className="mb-4 flex h-44 items-center justify-center rounded-xl border border-dashed border-white/10">
                      <span className="text-sm text-slate-600">
                        No thumbnail
                      </span>
                    </div>
                  )}

                  <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5">
                    <Upload size={17} />

                    {uploadThumbnail.isPending
                      ? "Uploading..."
                      : project.thumbnail
                      ? "Replace Thumbnail"
                      : "Upload Thumbnail"}

                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      className="hidden"
                      onChange={(e) => {
                        handleThumbnailUpload(
                          project._id,
                          e.target.files?.[0]
                        );

                        e.target.value = "";
                      }}
                    />
                  </label>

                  <p className="mt-2 text-center text-xs text-slate-600">
                    JPG, PNG or WebP · Max 5MB
                  </p>
                </div>

                {/* Screenshots */}

                <div className="rounded-2xl border border-white/10 bg-[#070a12] p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-white">
                        Screenshots
                      </h3>

                      <p className="mt-1 text-xs text-slate-500">
                        Add images showing your project.
                      </p>
                    </div>

                    <span className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-slate-500">
                      {project.images?.length || 0}
                    </span>
                  </div>

                  {project.images?.length > 0 ? (
                    <div className="grid grid-cols-2 gap-3">
                      {project.images.map(
                        (image: any) => (
                          <div
                            key={image.publicId}
                            className="group relative overflow-hidden rounded-xl border border-white/10"
                          >
                            <img
                              src={image.url}
                              alt={project.title}
                              className="h-28 w-full object-cover transition duration-300 group-hover:scale-105"
                            />

                            <button
                              type="button"
                              onClick={() =>
                                handleImageDelete(
                                  project._id,
                                  image.publicId
                                )
                              }
                              className="absolute right-2 top-2 rounded-lg bg-black/80 p-2 text-red-400 opacity-0 transition group-hover:opacity-100"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        )
                      )}
                    </div>
                  ) : (
                    <div className="flex h-28 items-center justify-center rounded-xl border border-dashed border-white/10">
                      <span className="text-sm text-slate-600">
                        No screenshots
                      </span>
                    </div>
                  )}

                  <label className="mt-4 flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5">
                    <Upload size={17} />

                    {uploadImages.isPending
                      ? "Uploading..."
                      : "Upload Screenshots"}

                    <input
                      type="file"
                      multiple
                      accept="image/jpeg,image/png,image/webp"
                      className="hidden"
                      onChange={(e) => {
                        handleImagesUpload(
                          project._id,
                          e.target.files
                        );

                        e.target.value = "";
                      }}
                    />
                  </label>

                  <p className="mt-2 text-center text-xs text-slate-600">
                    Select multiple · JPG, PNG or WebP ·
                    Max 5MB each
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Projects;