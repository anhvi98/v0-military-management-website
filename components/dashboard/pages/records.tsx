"use client"

import { useState } from "react"
import type { RecordNode } from "@/lib/types"
import { mockRecordTree } from "@/lib/mock-data"

interface TreeNodeProps {
  node: RecordNode
  level: number
  searchQuery: string
  onSelect: (node: RecordNode) => void
  onCreateFolder: (parentId: string) => void
  onDelete: (nodeId: string) => void
  onCopy: (node: RecordNode) => void
  onMove: (nodeId: string, targetParentId: string) => void
  clipboardNode: RecordNode | null
}

function TreeNodeComponent({
  node,
  level,
  searchQuery,
  onSelect,
  onCreateFolder,
  onDelete,
  onCopy,
  onMove,
  clipboardNode,
}: TreeNodeProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [showMenu, setShowMenu] = useState(false)

  const nodeMatches = node.name.toLowerCase().includes(searchQuery.toLowerCase())
  const childrenMatch = node.children?.some(
    (child) => child.name.toLowerCase().includes(searchQuery.toLowerCase()) || (child.children?.length ? true : false),
  )

  if (searchQuery && !nodeMatches && !childrenMatch) return null

  const isFolder = node.type === "folder"
  const hasChildren = isFolder && node.children && node.children.length > 0

  return (
    <div>
      <div
        className="flex items-center gap-2 px-2 py-2 hover:bg-blue-500/10 rounded cursor-pointer group relative"
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={() => {
          if (isFolder) setIsExpanded(!isExpanded)
          onSelect(node)
        }}
      >
        {isFolder && (
          <button className="p-0 hover:bg-blue-500/20 rounded transition-colors w-5 h-5 flex items-center justify-center">
            {hasChildren ? (
              <span className="text-blue-600 font-bold">{isExpanded ? "▼" : "▶"}</span>
            ) : (
              <span className="w-5" />
            )}
          </button>
        )}

        {!isFolder && <div className="w-5" />}

        <div className="p-1.5 bg-blue-500/10 rounded">
          {isFolder ? <span className="text-lg">📁</span> : <span className="text-lg">📄</span>}
        </div>

        <div className="flex-1 min-w-0">
          <p
            className={`text-sm font-medium text-foreground truncate ${
              searchQuery && node.name.toLowerCase().includes(searchQuery.toLowerCase())
                ? "font-bold text-blue-600"
                : ""
            }`}
          >
            {node.name}
          </p>
        </div>

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation()
              setShowMenu(!showMenu)
            }}
            className="p-1 hover:bg-blue-500/20 rounded transition-colors text-muted-foreground"
            title="Menu hành động"
          >
            ⋮
          </button>
        </div>

        {!isFolder && node.date && (
          <span className="text-xs text-muted-foreground whitespace-nowrap ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {new Date(node.date).toLocaleDateString("vi-VN")}
          </span>
        )}

        {showMenu && (
          <div className="absolute top-full right-0 mt-1 bg-card border border-border rounded-sm shadow-lg z-40 min-w-max">
            {isFolder && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onCreateFolder(node.id)
                    setShowMenu(false)
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-blue-500/10 transition-colors border-b border-border"
                >
                  + Tạo thư mục con
                </button>
              </>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation()
                onCopy(node)
                setShowMenu(false)
              }}
              className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-blue-500/10 transition-colors border-b border-border"
            >
              📋 Sao chép
            </button>
            {isFolder && clipboardNode && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onMove(clipboardNode.id, node.id)
                  setShowMenu(false)
                }}
                className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-blue-500/10 transition-colors border-b border-border"
              >
                ➜ Di chuyển vào
              </button>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation()
                if (confirm(`Bạn có chắc chắn muốn xóa "${node.name}"?`)) {
                  onDelete(node.id)
                  setShowMenu(false)
                }
              }}
              className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-500/10 transition-colors"
            >
              🗑️ Xóa
            </button>
          </div>
        )}
      </div>

      {isFolder && isExpanded && hasChildren && (
        <div>
          {node.children.map((child) => (
            <TreeNodeComponent
              key={child.id}
              node={child}
              level={level + 1}
              searchQuery={searchQuery}
              onSelect={onSelect}
              onCreateFolder={onCreateFolder}
              onDelete={onDelete}
              onCopy={onCopy}
              onMove={onMove}
              clipboardNode={clipboardNode}
            />
          ))}
        </div>
      )}
    </div>
  )
}

interface CreateFolderDialogProps {
  isOpen: boolean
  onClose: () => void
  onCreateFolder: (name: string, description: string) => void
  parentFolderName: string
}

function CreateFolderDialog({ isOpen, onClose, onCreateFolder, parentFolderName }: CreateFolderDialogProps) {
  const [folderName, setFolderName] = useState("")
  const [folderDescription, setFolderDescription] = useState("")

  const handleSubmit = () => {
    if (folderName.trim()) {
      onCreateFolder(folderName, folderDescription)
      setFolderName("")
      setFolderDescription("")
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card border border-blue-500/30 rounded-sm w-full max-w-md p-6 space-y-4 shadow-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground">Tạo thư mục mới</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-blue-500/10 rounded transition-colors text-muted-foreground"
          >
            ✕
          </button>
        </div>

        <div className="bg-blue-500/5 p-3 rounded border border-blue-500/20">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Vị trí</p>
          <p className="text-sm font-semibold text-foreground mt-1">{parentFolderName}</p>
        </div>

        <div>
          <label className="text-xs text-muted-foreground uppercase tracking-wide block mb-2">
            Tên thư mục <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            placeholder="Nhập tên thư mục..."
            className="w-full px-3 py-2 bg-background border border-border rounded-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50"
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
        </div>

        <div>
          <label className="text-xs text-muted-foreground uppercase tracking-wide block mb-2">Mô tả</label>
          <textarea
            value={folderDescription}
            onChange={(e) => setFolderDescription(e.target.value)}
            placeholder="Nhập mô tả (tùy chọn)..."
            className="w-full px-3 py-2 bg-background border border-border rounded-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 resize-none h-20"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-background border border-border rounded-sm text-foreground hover:bg-background/80 transition-colors"
          >
            Hủy
          </button>
          <button
            onClick={handleSubmit}
            disabled={!folderName.trim()}
            className="flex-1 px-4 py-2 military-btn disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Tạo thư mục
          </button>
        </div>
      </div>
    </div>
  )
}

export default function RecordsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRecord, setSelectedRecord] = useState<RecordNode | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [selectedParentId, setSelectedParentId] = useState<string | null>(null)
  const [selectedParentName, setSelectedParentName] = useState("")
  const [recordTree, setRecordTree] = useState(mockRecordTree)
  const [clipboardNode, setClipboardNode] = useState<RecordNode | null>(null) // added clipboard state

  const handleCreateFolder = (parentId: string | null) => {
    if (parentId) {
      const findParent = (nodes: RecordNode[]): RecordNode | null => {
        for (const node of nodes) {
          if (node.id === parentId) return node
          if (node.children) {
            const found = findParent(node.children)
            if (found) return found
          }
        }
        return null
      }

      const parent = findParent(recordTree)
      if (parent) {
        setSelectedParentId(parentId)
        setSelectedParentName(parent.name)
        setIsCreateDialogOpen(true)
      }
    }
  }

  const handleFolderCreated = (name: string, description: string) => {
    if (!selectedParentId) return

    const newFolder: RecordNode = {
      id: `folder-${Date.now()}`,
      name,
      type: "folder",
      children: [],
      description,
      createdAt: new Date(),
    }

    const updateTree = (nodes: RecordNode[]): RecordNode[] => {
      return nodes.map((node) => {
        if (node.id === selectedParentId) {
          return {
            ...node,
            children: [...(node.children || []), newFolder],
          }
        }
        if (node.children) {
          return {
            ...node,
            children: updateTree(node.children),
          }
        }
        return node
      })
    }

    setRecordTree(updateTree(recordTree))
    setSelectedParentId(null)
    setSelectedParentName("")
  }

  const handleDelete = (nodeId: string) => {
    const deleteNode = (nodes: RecordNode[]): RecordNode[] => {
      return nodes
        .filter((node) => node.id !== nodeId)
        .map((node) => ({
          ...node,
          children: node.children ? deleteNode(node.children) : undefined,
        }))
    }

    setRecordTree(deleteNode(recordTree))
    if (selectedRecord?.id === nodeId) {
      setSelectedRecord(null)
    }
  }

  const handleCopy = (node: RecordNode) => {
    setClipboardNode(node)
  }

  const handleMove = (nodeId: string, targetParentId: string) => {
    const moveNode = (nodes: RecordNode[]): RecordNode[] => {
      const result: RecordNode[] = []

      for (const node of nodes) {
        if (node.id === nodeId) {
          // Skip the node being moved at this level
          continue
        }

        if (node.id === targetParentId) {
          // Found target parent, add node to its children
          const nodeToMove = findNodeById(recordTree, nodeId)
          if (nodeToMove && node.type === "folder") {
            result.push({
              ...node,
              children: [...(node.children || []), { ...nodeToMove }],
            })
          } else {
            result.push(node)
          }
        } else {
          // Recursively process children
          result.push({
            ...node,
            children: node.children ? moveNode(node.children) : undefined,
          })
        }
      }

      return result
    }

    setRecordTree(moveNode(recordTree))
    setClipboardNode(null)
  }

  const findNodeById = (nodes: RecordNode[], id: string): RecordNode | null => {
    for (const node of nodes) {
      if (node.id === id) return node
      if (node.children) {
        const found = findNodeById(node.children, id)
        if (found) return found
      }
    }
    return null
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-blue-600">Sổ sách</h1>
        <button className="military-btn flex items-center gap-2" onClick={() => handleCreateFolder(null)}>
          <span>+</span>
          Thêm sổ sách
        </button>
      </div>

      <div className="relative">
        <span className="absolute left-3 top-3 text-muted-foreground">🔍</span>
        <input
          type="text"
          placeholder="Tìm kiếm sổ sách..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-sm text-foreground placeholder:text-muted-foreground"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 military-card p-4">
          <div className="bg-background/50 rounded border border-border overflow-hidden">
            <div className="p-3 border-b border-border bg-blue-500/5">
              <h3 className="text-sm font-semibold text-foreground">Cây thư mục</h3>
            </div>
            <div className="overflow-y-auto max-h-[600px] p-2">
              {recordTree.map((node) => (
                <TreeNodeComponent
                  key={node.id}
                  node={node}
                  level={0}
                  searchQuery={searchQuery}
                  onSelect={setSelectedRecord}
                  onCreateFolder={handleCreateFolder}
                  onDelete={handleDelete}
                  onCopy={handleCopy}
                  onMove={handleMove}
                  clipboardNode={clipboardNode}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="military-card p-4">
          <div className="bg-background/50 rounded border border-border">
            <div className="p-3 border-b border-border bg-blue-500/5">
              <h3 className="text-sm font-semibold text-foreground">Chi tiết</h3>
            </div>
            <div className="p-4">
              {selectedRecord ? (
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Tên</p>
                    <p className="text-sm font-semibold text-foreground mt-1">{selectedRecord.name}</p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Loại</p>
                    <p className="text-sm text-foreground mt-1 capitalize">
                      {selectedRecord.type === "folder" ? "Thư mục" : "Tệp"}
                    </p>
                  </div>

                  {selectedRecord.description && (
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Mô tả</p>
                      <p className="text-sm text-foreground mt-1">{selectedRecord.description}</p>
                    </div>
                  )}

                  {selectedRecord.type === "file" && (
                    <>
                      {selectedRecord.category && (
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wide">Danh mục</p>
                          <p className="text-sm text-foreground mt-1">{selectedRecord.category}</p>
                        </div>
                      )}

                      {selectedRecord.department && (
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wide">Phòng ban</p>
                          <p className="text-sm text-foreground mt-1">{selectedRecord.department}</p>
                        </div>
                      )}

                      {selectedRecord.date && (
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wide">Ngày tạo</p>
                          <p className="text-sm text-foreground mt-1">
                            {new Date(selectedRecord.date).toLocaleDateString("vi-VN")}
                          </p>
                        </div>
                      )}
                    </>
                  )}

                  {selectedRecord.type === "folder" && selectedRecord.children && (
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Số mục con</p>
                      <p className="text-sm text-foreground mt-1">{selectedRecord.children.length}</p>
                    </div>
                  )}

                  {selectedRecord.type === "folder" && (
                    <div className="pt-4 border-t border-border space-y-2">
                      <button
                        onClick={() => {
                          setSelectedParentId(selectedRecord.id)
                          setSelectedParentName(selectedRecord.name)
                          setIsCreateDialogOpen(true)
                        }}
                        className="w-full military-btn text-sm py-2"
                      >
                        + Tạo thư mục con
                      </button>
                      <button
                        onClick={() => handleCopy(selectedRecord)}
                        className="w-full military-btn text-sm py-2 bg-blue-600/80 hover:bg-blue-600"
                      >
                        📋 Sao chép
                      </button>
                      <button
                        onClick={() => {
                          if (
                            confirm(`Bạn có chắc chắn muốn xóa thư mục "${selectedRecord.name}" và nội dung của nó?`)
                          ) {
                            handleDelete(selectedRecord.id)
                          }
                        }}
                        className="w-full px-4 py-2 text-sm text-red-500 border border-red-500/30 rounded-sm hover:bg-red-500/10 transition-colors"
                      >
                        🗑️ Xóa
                      </button>
                    </div>
                  )}

                  {selectedRecord.type === "file" && (
                    <div className="pt-4 border-t border-border space-y-2">
                      <button className="w-full military-btn text-sm py-2">Mở</button>
                      <button
                        onClick={() => handleCopy(selectedRecord)}
                        className="w-full military-btn text-sm py-2 bg-blue-600/80 hover:bg-blue-600"
                      >
                        📋 Sao chép
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Bạn có chắc chắn muốn xóa tệp "${selectedRecord.name}"?`)) {
                            handleDelete(selectedRecord.id)
                          }
                        }}
                        className="w-full px-4 py-2 text-sm text-red-500 border border-red-500/30 rounded-sm hover:bg-red-500/10 transition-colors"
                      >
                        🗑️ Xóa
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="p-3 bg-blue-500/10 rounded-full w-fit mx-auto mb-3">
                    <span className="text-3xl">📚</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Chọn một mục để xem chi tiết</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <CreateFolderDialog
        isOpen={isCreateDialogOpen}
        onClose={() => {
          setIsCreateDialogOpen(false)
          setSelectedParentId(null)
          setSelectedParentName("")
        }}
        onCreateFolder={handleFolderCreated}
        parentFolderName={selectedParentName}
      />
    </div>
  )
}
