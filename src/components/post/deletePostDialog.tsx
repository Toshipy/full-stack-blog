import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { deletePost } from '@/lib/actions/deletePost'

type DeletePostDialogProps = {
  postId: string
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}

export function DeletePostDialog({
  postId,
  isOpen,
  onOpenChange
}: DeletePostDialogProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>記事の削除</AlertDialogTitle>
          <AlertDialogDescription>
            この記事を削除してもよろしいですか？
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>キャンセル</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-600"
            onClick={() => deletePost(postId)}
          >
            削除する
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
