import { Upload, Modal } from '@arco-design/web-react'
import { optionsProps } from '@/types/form'
import { useEffect, useState } from 'react'
import { uploadApi } from '@/services/login'
import { UploadItem } from '@arco-design/web-react/es/Upload'

interface uploadInterface extends optionsProps {
  changeValue(field: string, value: any): void
  field: string
  value: any
}

const acUpload = (props: uploadInterface) => {
  const [fileList, setFileList] = useState([])

  const pic = props.value

  useEffect(() => {
    if (pic) {
      let picList: any = pic ? [{ url: pic }] : []
      setFileList(picList)
    }
  }, [pic])

  const showPic = (file: UploadItem) => {
    Modal.info({
      title: '预览',
      content: (
        <div style={{ textAlign: 'center' }}>
          <img
            style={{ maxWidth: '100%' }}
            src={
              file.url ||
              (file.originFile && URL.createObjectURL(file.originFile))
            }
          />
        </div>
      )
    })
  }

  const removePic = (file: UploadItem) => {
    return new Promise((resolve, reject) => {
      Modal.confirm({
        title: 'onRemove',
        content: `确认删除`,
        onConfirm: () => {
          props.changeValue(props.field, '')
          resolve(true)
          setFileList([])
        },
        onCancel: () => reject('cancel')
      })
    })
  }

  return (
    <Upload
      listType="picture-card"
      fileList={fileList}
      limit={1}
      tip={props.tip}
      onPreview={showPic}
      onRemove={removePic}
      customRequest={async option => {
        const { file } = option
        let res = await uploadApi(file)
        props.changeValue(props.field, res.payload[0].url)
        setFileList(res.payload)
      }}
    />
  )
}

export default acUpload
