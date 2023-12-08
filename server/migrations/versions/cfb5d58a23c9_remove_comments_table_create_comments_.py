"""Remove comments table, create comments column in tasks

Revision ID: cfb5d58a23c9
Revises: 4c4a6aa8c85f
Create Date: 2023-12-07 12:21:02.486238

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'cfb5d58a23c9'
down_revision = '4c4a6aa8c85f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('comments')
    with op.batch_alter_table('tasks', schema=None) as batch_op:
        batch_op.add_column(sa.Column('comments', sa.Text(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('tasks', schema=None) as batch_op:
        batch_op.drop_column('comments')

    op.create_table('comments',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('comment', sa.TEXT(), nullable=True),
    sa.Column('task_id', sa.INTEGER(), nullable=True),
    sa.ForeignKeyConstraint(['task_id'], ['tasks.id'], name='fk_comments_task_id_tasks'),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###